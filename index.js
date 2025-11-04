const puppeteer = require('puppeteer')
const { createWorker } = require('tesseract.js');
const Jimp = require('jimp');

(async () => {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();

    await page.goto('https://www.sescpr.com.br/unidade/sesc-da-esquina/espaco/restaurante-3/');

    await page.setViewport({ width: 1080, height: 1024 });

    const src = await page.$eval('.alignnone', (img) => {
        const imgSrc = img.getAttribute("src")
        return imgSrc
    })
    console.log('src', src)


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

    await getText('segunda', cropSegunda)
    await getText('terca', cropTerca)
    await getText('quarta', cropQuarta)
    await getText('quinta', cropQuinta)
    await getText('sexta', cropSexta)
    await browser.close();
    await worker.terminate();
})();

async function getText(name, cropped) {
    const worker = await createWorker('eng');

    // Descomentar para ajudar na depuração
    // const file = './' + name + '.png'
    // await cropped.writeAsync(file)
    // console.log('Escrito arquivo ' + file)

    const buffer = await cropped.getBufferAsync("image/png")
    const result = await worker.recognize(buffer)
    console.log('---- TEXTO RECONHECIDO ----')
    console.log(result.data.text)

    await worker.terminate();

    return result.data.text
}