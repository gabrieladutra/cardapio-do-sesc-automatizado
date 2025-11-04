const { createWorker } = require('tesseract.js');
const Jimp = require('jimp');

(async () => {
  const worker = await createWorker('eng');
  const image = await Jimp.read("https://www.sescpr.com.br/wp-content/uploads/2019/04/03-s-07.11_page-0001-1-scaled.jpg");

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

  const textSegunda = await getText('segunda', cropSegunda)
  const textTerca = await getText('terca', cropTerca)
  const textQuarta = await getText('quarta', cropQuarta)
  const textQuinta = await getText('quinta', cropQuinta)
  const textSexta = await getText('sexta', cropSexta)
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