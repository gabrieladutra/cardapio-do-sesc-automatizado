const puppeteer = require('puppeteer')

const main = async () => {
    const browser = await puppeteer.launch({args: ["--no-sandbox"]});
    const page = await browser.newPage();
    
    await page.goto('https://www.sescpr.com.br/unidade/sesc-da-esquina/espaco/restaurante-3/');
    
    await page.setViewport({width: 1080, height: 1024});
    
    const src = await page.$eval('.alignnone', (img) => {
        const imgSrc = img.getAttribute("src")
        return imgSrc
    })
    console.log('src', src)
    
    await browser.close();
}

main()
