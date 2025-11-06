const { parse } = require('node-html-parser')
const { createWorker } = require('tesseract.js');
const Jimp = require('jimp');

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

    await getText('segunda', cropSegunda, cropDataSegunda)
    await getText('terca', cropTerca, cropDataTerca)
    await getText('quarta', cropQuarta, cropDataQuarta)
    await getText('quinta', cropQuinta, cropDataQuinta)
    await getText('sexta', cropSexta, cropDataSexta)

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

module.exports.handler = handler