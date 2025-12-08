import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { getRestMessage, getLanMessage } from "./dailyMenu.js";

const sns = new SNSClient({ region: "sa-east-1" });

async function sendMessage(mensagem) {
    await sns.send(new PublishCommand({
        TopicArn: "arn:aws:sns:sa-east-1:924568413237:menuSMS",
        Message: mensagem
    }));
    console.log("MENSAGEM ENVIADA:", mensagem);
}

export default async function handler() {
    const restMsg = await getRestMessage();
    const lanMsg = await getLanMessage();

    await sendMessage(restMsg);
    await sendMessage(lanMsg);
}