const { DynamoDBClient, PutItemCommand, QueryCommand } = require('@aws-sdk/client-dynamodb');
const { parse } = require('node-html-parser')
const { createWorker } = require('tesseract.js');
const Jimp  = require('jimp');
const dynamo = new DynamoDBClient({ region: 'sa-east-1' });

async function handler() {
    const response = await fetch('https://www.sescpr.com.br/unidade/sesc-da-esquina/espaco/lanchonete/');
    const html = await response.text();
    const root = parse(html);
    const img = root.querySelector('.alignnone.size-full');
    let src = img.getAttribute('src');
    //console.log("SRC da imagem:", src);
    const image = await Jimp.read(src);
    const imageWidth = image.bitmap.width
    const imageHeight = image.bitmap.height
    const squares = 5
    const emptySpaces = 6
    const proportion = 14.314285714
    const totalEmpty = (squares * proportion) + emptySpaces
    const emptySpaceWidth = (imageWidth / totalEmpty)
    const filledWidth = emptySpaceWidth * proportion
    
     
    console.log("Largura x Altura da imagem:", imageWidth, imageHeight)
    console.log("Tamnhano P: ", filledWidth)
    console.log("Tamanho Vazio:", emptySpaceWidth)
    console.log("Proporção: ", proportion)

    const marginTop = imageHeight * 0.42
    const height = imageHeight * 0.31

    console.log("height: ", height)
    console.log("top:",marginTop)
 
    const cropSegunda = image.clone().crop(emptySpaceWidth, marginTop, filledWidth, height);
    const cropTerca = image.clone().crop((2 * emptySpaceWidth) + filledWidth, marginTop,filledWidth, height);
    const cropQuarta = image.clone().crop((3 * emptySpaceWidth) + (2 * filledWidth) ,marginTop, filledWidth, height)
    const cropQuinta = image.clone().crop((4 * emptySpaceWidth) + (3 * filledWidth) ,marginTop, filledWidth, height)
    const cropSexta = image.clone().crop((5 * emptySpaceWidth) + (4 * filledWidth) ,marginTop, filledWidth, height)

    const dateHeight = imageHeight * 0.04
    const dateMarginTop = imageHeight * 0.37

    const cropDataSegunda = image.clone().crop(emptySpaceWidth, dateMarginTop, filledWidth, dateHeight)
    const cropDataTerca = image.clone().crop((2 * emptySpaceWidth) + filledWidth, dateMarginTop, filledWidth, dateHeight)
    const cropDataQuarta = image.clone().crop((3 * emptySpaceWidth) + (2 * filledWidth), dateMarginTop, filledWidth, dateHeight)
    const cropDataQuinta = image.clone().crop((4 * emptySpaceWidth) + (3 * filledWidth), dateMarginTop, filledWidth, dateHeight)
    const cropDataSexta = image.clone().crop((5 * emptySpaceWidth) + (4 * filledWidth), dateMarginTop, filledWidth, dateHeight)

    const segunda = await getText('segunda', cropSegunda, cropDataSegunda)
    const terca = await getText('terca', cropTerca, cropDataTerca)
    const quarta = await getText('quarta', cropQuarta, cropDataQuarta)
    const quinta = await getText('quinta', cropQuinta, cropDataQuinta)
    const sexta = await getText('sexta', cropSexta, cropDataSexta)


    const menus = [segunda, terca, quarta, quinta, sexta]
    for (const diaAtual of menus) {
        const version = await verifyVersion(diaAtual.date)
        if (version.length === 0) {
            await saveToDynamoDB(diaAtual, 1)
            continue;
        }

        let maior = version[0];

        for (let i = 1; i < version.length; i++) {
            if (parseInt(version[i].versao.N) > parseInt(maior.versao.N)) {
                maior = version[i];
            }
        }
        if (maior.texto.S.trim() !== diaAtual.text.trim()) {
            const novaVersao = parseInt(maior.versao.N) + 1;
            await saveToDynamoDB(diaAtual, novaVersao);
        }
    }
   
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

async function saveToDynamoDB(menu, versao) {
    const params = {
        TableName: 'lanchonete',

        Item: {
            data: { S: String(menu.date || '').trim() },
            texto: { S: String(menu.text || '').trim() },
            versao: { N: String(versao) },
        },
    };

    await dynamo.send(new PutItemCommand(params));
    console.log('Item salvo no DynamoDB:', menu.date);
} 

async function verifyVersion(date) {
    const params = {
        TableName: "lanchonete",
        KeyConditionExpression: "#d = :d",
        ExpressionAttributeNames: {
            "#d": "data",
        },
        ExpressionAttributeValues: {
            ":d": { S: String(date).trim() },
        },
        ConsistentRead: true,
    };
    const data = await dynamo.send(new QueryCommand(params));
    if (!data.Items || data.Items.length === 0) {
        console.log("Nenhum item encontrado para:", date);
        return [];
    }
    console.log("Itens encontrados:", data.Items);

    return data.Items;
}
module.exports.handler = handler
//handler()
