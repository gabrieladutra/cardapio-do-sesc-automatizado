const { DynamoDBClient, QueryCommand } = require('@aws-sdk/client-dynamodb');
const dynamo = new DynamoDBClient({ region: 'sa-east-1' });
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const sns = new SNSClient({ region: "sa-east-1" });
const { getRestMessage, getLanMessage} = require('./dailyMenu.js');

async function sendMessage(mensagem) {
    await sns.send(new PublishCommand({
        TopicArn: "arn:aws:sns:sa-east-1:924568413237:menuSMS",
        Message: mensagem
    }));
    console.log("MENSAGEM ENVIADA:", mensagem);
}

async function handler() {
    await sendMessage(getRestMessage());
    await sendMessage(getLanMessage);
    return { status: "ok" };
}

module.exports.handler = handler;
//handler()