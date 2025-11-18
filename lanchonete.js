//import { DynamoDBClient, PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
const { parse } = require('node-html-parser')
const { createWorker } = require('tesseract.js');
const Jimp = require('jimp');
//const dynamo = new DynamoDBClient({ region: 'sa-east-1' });

async function handler() {
    const response = await fetch('https://www.sescpr.com.br/unidade/sesc-da-esquina/espaco/lanchonete/');
    const html = await response.text();
    const root = parse(html);
    const img = root.querySelector('.alignnone');
    const src = img.getAttribute('src');
    const image = await Jimp.read(src);

    const marginLeft = 75
    const marginTop = 1040
    const height = 737
    const width = 636
    const gap = 40

    const cropSegunda = image.clone().crop(marginLeft, marginTop, width, height);
    const cropTerca = image.clone().crop(marginLeft + width + gap, marginTop, width, height);
    const cropQuarta = image.clone().crop(marginLeft + (width + gap) * 2, marginTop, width, height)
    const cropQuinta = image.clone().crop(marginLeft + (width + gap) * 3, marginTop, width, height)
    const cropSexta = image.clone().crop(marginLeft + (width + gap) * 4, marginTop, width, height)

    const dateHeight = 76
    const dateGap = 9
    const dateMarginTop = marginTop - dateHeight - dateGap

    const cropDataSegunda = image.clone().crop(marginLeft, dateMarginTop, width, dateHeight)
    const cropDataTerca = image.clone().crop(marginLeft + width + gap, dateMarginTop, width, dateHeight)
    const cropDataQuarta = image.clone().crop(marginLeft + (width + gap) * 2, dateMarginTop, width, dateHeight)
    const cropDataQuinta = image.clone().crop(marginLeft + (width + gap) * 3, dateMarginTop, width, dateHeight)
    const cropDataSexta = image.clone().crop(marginLeft + (width + gap) * 4, dateMarginTop, width, dateHeight)

    const segunda = await getText('segunda', cropSegunda, cropDataSegunda)
    const terca = await getText('terca', cropTerca, cropDataTerca)
    const quarta = await getText('quarta', cropQuarta, cropDataQuarta)
    const quinta = await getText('quinta', cropQuinta, cropDataQuinta)
    const sexta = await getText('sexta', cropSexta, cropDataSexta)

//     const menus = [segunda, terca, quarta, quinta, sexta]
//     for (const diaAtual of menus) {
//         const version = await verifyVersion(diaAtual.date)
//         if (version.length === 0) {
//             console.log("****entrou****")
//             await saveToDynamoDB(diaAtual, 1)
//             continue;
//         }

//         let maior = version[0];

//         for (let i = 1; i < version.length; i++) {
//             if (parseInt(version[i].versao.N) > parseInt(maior.versao.N)) {
//                 maior = version[i];
//             }
//         }
//         if (maior.texto.S.trim() !== diaAtual.text.trim()) {
//             const novaVersao = parseInt(maior.versao.N) + 1;
//             await saveToDynamoDB(diaAtual, novaVersao);
//         }
//     }
   
// }
async function getText(name, cropped, croppedData) {
    const worker = await createWorker('eng');
    // //Descomentar para ajudar na depuração
    // const file = './' + name + '.png'
    // await cropped.writeAsync(file)
    // console.log('Escrito arquivo ' + file)
    const buffer = await cropped.getBufferAsync("image/png")
    const bufferData = await croppedData.getBufferAsync("image/png")
    const texto = await worker.recognize(buffer)
    const data = await worker.recognize(bufferData)
    const menu = {
        text: texto.data.text,
        date: data.data.text,
    }
    console.log('---- TEXTO RECONHECIDO ----')
    console.log(`Data: ${menu.date} \n${menu.text}`);
    await worker.terminate();
    return menu
}
}

module.exports.handler = handler


handler()

// async function saveToDynamoDB(menu, versao) {
//     const params = {
//         TableName: 'menu',

//         Item: {
//             data: { S: String(menu.date || '').trim() },
//             texto: { S: String(menu.text || '').trim() },
//             versao: { N: String(versao) },
//         },
//     };

//     await dynamo.send(new PutItemCommand(params));
//     console.log('Item salvo no DynamoDB:', menu.date);
// }

// async function verifyVersion(date) {
//     const params = {
//         TableName: "menu",
//         KeyConditionExpression: "#d = :d",
//         ExpressionAttributeNames: {
//             "#d": "data",
//         },
//         ExpressionAttributeValues: {
//             ":d": { S: String(date).trim() },
//         },
//         ConsistentRead: true,
//     };
//     const data = await dynamo.send(new QueryCommand(params));
//     if (!data.Items || data.Items.length === 0) {
//         console.log("Nenhum item encontrado para:", date);
//         return [];
//     }
//     console.log("Itens encontrados:", data.Items);

//     return data.Items;