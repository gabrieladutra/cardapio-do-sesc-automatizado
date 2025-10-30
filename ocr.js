const { createWorker } = require('tesseract.js');
const Jimp = require('jimp');


// (async () => {
//   const worker = await createWorker('eng');
//   const ret = await worker.recognize('https://www.sescpr.com.br/wp-content/uploads/2019/04/27-a-31.10-Copia-Copia-Copia-Copia-Copia_page-0001-2-scaled.jpg');
//   console.log("\n\n----------- TEXTO RECONHECIDO 1 ----------\n\n");
//   console.log(ret.data.text);
//   await worker.terminate();
// })();

(async () => {
  const worker = await createWorker('eng');
  const image = await Jimp.read("https://www.sescpr.com.br/wp-content/uploads/2019/04/27-a-31.10-Copia-Copia-Copia-Copia-Copia_page-0001-2-scaled.jpg");

  const marginLeft = 56
  const marginTop = 790
  const height = 556
  const width = 462
  const gap = 33
  const cropSegunda = image.clone().crop(marginLeft, marginTop, width, height);

  const cropTerca = image.clone().crop(marginLeft + width + gap, marginTop,width, height);

  const cropQuarta = image.clone().crop(marginLeft + (width + gap) * 2, marginTop, width ,height)

  const cropQuinta = image.clone().crop(marginLeft + (width + gap) * 3, marginTop, width ,height)

  const cropSexta = image.clone().crop(marginLeft + (width + gap) * 4, marginTop, width ,height)

  const imgSegundaFeira = "./imgSegundaFeira.png"
  const imgTercaFeira = "./imgTercaFeira.png"
  const imgQuartaFeira = "./imgQuartaFeira.png"
  const imgQuintaFeira = "./imgQuintaFeira.png"
  const imgSextaFeira = "./imgSegundaFeira.png"

  await cropSegunda.writeAsync(imgSegundaFeira);
  await cropTerca.writeAsync(imgTercaFeira);
  await cropQuarta.writeAsync(imgQuartaFeira);
  await cropQuinta.writeAsync(imgQuintaFeira);
  await cropSexta.writeAsync(imgSextaFeira);

  
  const resultSegundaFeira = await worker.recognize(imgSegundaFeira);
  const resultTercaFeira = await worker.recognize(imgTercaFeira);
  const resultQuartaFeira = await worker.recognize(imgQuartaFeira);
  const resultQuintaFeira = await worker.recognize(imgQuintaFeira);
  const resultSextaFeira = await worker.recognize(imgSextaFeira);

  console.log("\n\n----------- TEXTO RECONHECIDO 1----------\n\n");
  console.log(resultSegundaFeira.data.text);
  console.log("\n\n----------- TEXTO RECONHECIDO 2 ----------\n\n");
  console.log(resultTercaFeira.data.text);
  console.log("\n\n----------- TEXTO RECONHECIDO 3 ----------\n\n");
  console.log(resultQuartaFeira.data.text);
  console.log("\n\n----------- TEXTO RECONHECIDO 4 ----------\n\n");
  console.log(resultQuintaFeira.data.text);
  console.log("\n\n----------- TEXTO RECONHECIDO 5 ----------\n\n");
  console.log(resultSextaFeira.data.text);

  await worker.terminate();
})();