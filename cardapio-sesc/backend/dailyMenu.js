import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
const dynamo = new DynamoDBClient({ region: 'sa-east-1' });

export function getTodayBR() {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const brasilTime = new Date(utc - 3 * 60 * 60000);
    const dia = String(brasilTime.getDate()).padStart(2, '0');
    const mes = String(brasilTime.getMonth() + 1).padStart(2, '0');
    const ano = brasilTime.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

export async function getMenuOfTheDayList(tableName, date) {
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


export async function findMenu(menus) {
    if (!menus || menus.length === 0) return null;

    let menuAtualizado = menus[0];
    for (let i = 1; i < menus.length; i++) {
        if (parseInt(menus[i].versao.N) > parseInt(menuAtualizado.versao.N)) {
            menuAtualizado = menus[i];
        }
    }
    return menuAtualizado;
}
export async function getRestMessage(){
    const hoje = getTodayBR();
    const restauranteTable = "menu";
    const menuRest = await getMenuOfTheDayList(restauranteTable, hoje);
    const menuAtualizadoRest = await findMenu(menuRest);

    if (!menuAtualizadoRest) {
        console.log("Nenhum menu atualizado encontrado para restaurante.");
        return null;
    }
    if (!menuAtualizadoRest.texto || !menuAtualizadoRest.texto.S) {
        console.log("O item de restaurante não possui campo texto.");
        return null;
    }

    return `${hoje}\n${menuAtualizadoRest.texto.S}`;
}

export async function getLanMessage(){
    const hoje = getTodayBR();
    const lanchoneteTable = "lanchonete";
    const menuLanch = await getMenuOfTheDayList(lanchoneteTable, hoje);
    const menuAtualizadoLan = await findMenu(menuLanch);

    if (!menuAtualizadoLan) {
        console.log("Nenhum menu atualizado encontrado para lanchonete.");
        return null;
    }
    if (!menuAtualizadoLan.texto || !menuAtualizadoLan.texto.S) {
        console.log("O item de lanchonete não possui campo texto.");
        return null;
    }

    return `${hoje}\n${menuAtualizadoLan.texto.S}`;
}

export async function handler(){
    const restMsg = await getRestMessage();
    const lanMsg = await getLanMessage();

    console.log("Restaurante:", restMsg);
    console.log("Lanchonete:", lanMsg);
}

handler();
// module.exports = {
//     getTodayBR,
//     getMenuOfTheDayList,
//     findMenu,
//     getRestMessage,
//     getLanMessage
// };