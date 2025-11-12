const { DynamoDBClient, PutItemCommand, GetItemCommand } = require('@aws-sdk/client-dynamodb');
const { parse } = require('node-html-parser')
const { createWorker } = require('tesseract.js');
const Jimp = require('jimp');

const dynamo = new DynamoDBClient({ region: 'sa-east-1' });

async function handler() {
    const response = await fetch('https://www.sescpr.com.br/unidade/sesc-da-esquina/espaco/restaurante-3/');
    const html = await response.text();
    const root = parse(html);
    const img = root.querySelector('.alignnone');
    const src = img.getAttribute('src');
    const worker = await createWorker('eng');
    const image = await Jimp.read(src);

    const marginLeft = 56
    const marginTop = 790
    const height = 556
    const width = 462
    const gap = 33

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

    // sexta.

    await worker.terminate();
}

async function getText(name, cropped, croppedData) {
    const worker = await createWorker('eng');
    //Descomentar para ajudar na depuração
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


// module.exports.handler = handler
// handler()
verifyVersion('07/11/2025')
async function verifyVersion(date){
   const getParams = {
        TableName: 'menu',
        Key: { data: { S: String(date).trim() } },
    };
    const response = await dynamo.send(new GetItemCommand(getParams));
    if (!response.Item) {
        return 1;
    }
    const currentVersion = parseInt(response.Item.versao.N);
    return currentVersion++
}


async function saveToDynamoDB(menu) {
    const version = await verifyVersion(menu.date);

    const params = {
        TableName: 'menu',

        Item: {
            data: { S: String(menu.date || '').trim() },
            texto: { S: String(menu.text || '').trim() },
            versao: { N: String(version) },
        },
    };

    await dynamo.send(new PutItemCommand(params));
    console.log('Item salvo no DynamoDB:', menu.date);
}