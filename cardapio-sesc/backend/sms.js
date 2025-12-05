const { DynamoDBClient, QueryCommand } = require('@aws-sdk/client-dynamodb');
const dynamo = new DynamoDBClient({ region: 'sa-east-1' });
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const sns = new SNSClient({ region: "sa-east-1" });

function getTodayBR() {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const brasilTime = new Date(utc - 3 * 60 * 60000);
    const dia = String(brasilTime.getDate()).padStart(2, '0');
    const mes = String(brasilTime.getMonth() + 1).padStart(2, '0');
    const ano = brasilTime.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

async function getMenuOfTheDayList(tableName, date) {
    const params = {
        TableName: tableName,
        KeyConditionExpression: "#d = :d",
        ExpressionAttributeNames: { "#d": "data" },
        ExpressionAttributeValues: { ":d": { S: String(date).trim() } },
        ConsistentRead: true,
    };

    const data = await dynamo.send(new QueryCommand(params));
    if (!data.Items || data.Items.length === 0) {
        console.log(`Nenhum item encontrado na tabela ${tableName} para a data:`, date);
        return [];
    }

    return data.Items;
}

async function findMenu(menus) {
    if (!menus || menus.length === 0) return null;

    let menuAtualizado = menus[0];
    for (let i = 1; i < menus.length; i++) {
        if (parseInt(menus[i].versao.N) > parseInt(menuAtualizado.versao.N)) {
            menuAtualizado = menus[i];
        }
    }
    return menuAtualizado;
}

async function sendMessage(mensagem) {
    await sns.send(new PublishCommand({
        TopicArn: "arn:aws:sns:sa-east-1:924568413237:menuSMS",
        Message: mensagem
    }));
    console.log("MENSAGEM ENVIADA:", mensagem);
}

async function handler() {
    const hoje = getTodayBR();

    const restauranteTable = "menu";
    const lanchoneteTable = "lanchonete";

    // Buscar listas
    const menuRest = await getMenuOfTheDayList(restauranteTable, hoje);
    const menuLanch = await getMenuOfTheDayList(lanchoneteTable, hoje);

    // Encontrar menus atualizados
    const menuAtualizadoRest = await findMenu(menuRest);
    const menuAtualizadoLan = await findMenu(menuLanch);

    if (!menuAtualizadoRest) {
        console.log("Nenhum menu atualizado encontrado para restaurante.");
    } else {
        if (!menuAtualizadoRest.texto || !menuAtualizadoRest.texto.S) {
            console.log("O item de restaurante não possui campo texto.");
        } else {
            const msgRest = `${hoje}\n${menuAtualizadoRest.texto.S}`;
            await sendMessage(msgRest);
        }
    }

    if (!menuAtualizadoLan) {
        console.log("Nenhum menu atualizado encontrado para lanchonete.");
    } else {
        if (!menuAtualizadoLan.texto || !menuAtualizadoLan.texto.S) {
            console.log("O item de lanchonete não possui campo texto.");
        } else {
            const msgLan = `${hoje}\n${menuAtualizadoLan.texto.S}`;
            await sendMessage(msgLan);
        }
    }

    return { status: "ok" };
}

module.exports.handler = handler;
//handler()