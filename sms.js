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
        console.log("Nenhum item encontrado para:", date);
        return [];
    }

    return data.Items;
}


async function findMenu(menus, date) {
    if (menus.length === 0) {
        console.log("Nenhum menu encontrado para hoje:", date);
        return;
    }
    let menuAtualizado = menus[0];
    for (let i = 1; i < menus.length; i++) {
        if (parseInt(menus[i].versao.N) > parseInt(menuAtualizado.versao.N)) {
            menuAtualizado = menus[i];
        }
    }
    return menuAtualizado

}


async function sendMessage(mensagem) {
    await sns.send(new PublishCommand({
        TopicArn: "arn:aws:sns:sa-east-1:924568413237:menuSMS",
        Message: mensagem
    }));

}

async function handler() {
    const hoje = getTodayBR();

    const restauranteTable = "menu";
    const lanchoneteTable = "lanchonete";

    const menuRestaurante = await getMenuOfTheDayList(restauranteTable, hoje);
    const menuLanchonete = await getMenuOfTheDayList(lanchoneteTable, hoje);

    const menuAtualizadoRestaurante = await findMenu(menuRestaurante, hoje);
    const menuAtualizadoLanchonete = await findMenu(menuLanchonete, hoje);

    const mensagemRestaurante = `${hoje}\n${menuAtualizadoRestaurante.texto.S}`;
    await sendMessage(mensagemRestaurante);

    const mensagemLanchonete = `${hoje}\n${menuAtualizadoLanchonete.texto.S}`;
    await sendMessage(mensagemLanchonete);
}
// async function handler() {
//     const hoje = getTodayBR();

//     const restauranteTable = "menu";
//     const lanchoneteTable = "lanchonete"

//     const menuRestaurante = await getMenuOfTheDayList(restauranteTable, hoje);
//     const menuLanchonete = await getMenuOfTheDayList(lanchoneteTable, hoje);

//     const menuAtualizadoRestaurante = await findMenu(menuRestaurante, hoje);
//     const menuAtualizadoLanchonete = await findMenu(menuLanchonete, hoje);


//     const mensagemRestaurante = `${hoje}\n${menuAtualizadoRestaurante.texto.S}`;
//     const mensagemLanchonete = `${hoje}\n${menuAtualizadoLanchonete.texto.S}`;

//     sendMessage(mensagemRestaurante)
//     sendMessage(mensagemLanchonete)
// }
module.exports.handler = handler

handler()
