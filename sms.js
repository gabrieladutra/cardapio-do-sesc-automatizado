const { DynamoDBClient, PutItemCommand, QueryCommand } = require('@aws-sdk/client-dynamodb');
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

async function getMenuOfTheDayList(date) {
    const params = {
        TableName: "menu",
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

async function handler() {
    const hoje = getTodayBR();
    const menus = await getMenuOfTheDayList(hoje);

    if (menus.length === 0) {
        console.log("Nenhum menu encontrado para hoje:", hoje);
        return;
    }
    let menuAtualizado = menus[0];
    for (let i = 1; i < menus.length; i++) {
        if (parseInt(menus[i].versao.N) > parseInt(menuAtualizado.versao.N)) {
            menuAtualizado = menus[i];
        }
    }
const mensagem = `${hoje}\n${menuAtualizado.texto.S}`;
        await sns.send(new PublishCommand({
            TopicArn: "arn:aws:sns:sa-east-1:924568413237:menuSMS",
            Message: mensagem
        })); 
        console.log(mensagem)

}
module.exports.handler = handler
// handler()
