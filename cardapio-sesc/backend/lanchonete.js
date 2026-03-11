import { DynamoDBClient, PutItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb"
import { parse } from "node-html-parser"
import { createWorker } from "tesseract.js"
import { Jimp } from "jimp"
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

const dynamo = new DynamoDBClient({ region: 'sa-east-1' });

export async function handler(event) {
  try {
    await processMenu()

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    }
  } catch (error) {
    console.error(error)

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro interno" }),
    }
  }
}

async function processMenu() {
  const response = await fetch(
    "https://www.sescpr.com.br/unidade/sesc-da-esquina/espaco/lanchonete/"
  )

  const html = await response.text()
  const root = parse(html)
  const img = root.querySelector('.entry-content p>img')

  if (img == null) {
    throw new Error("Mudança no seletor da classe que contem a img. Corrija o seletor")
  }
  const src = img.getAttribute("src")
  const image = await Jimp.read(src)
  const imageWidth = image.bitmap.width
  const imageHeight = image.bitmap.height

  const squares = 5
  const emptySpaces = 6
  const proportion = 14.314285714

  const totalEmpty = (squares * proportion) + emptySpaces
  const emptySpaceWidth = (imageWidth / totalEmpty)
  const filledWidth = emptySpaceWidth * proportion

  const marginTop = imageHeight * 0.42
  const height = imageHeight * 0.31

  const crops = [
    emptySpaceWidth,
    (2 * emptySpaceWidth) + filledWidth,
    (3 * emptySpaceWidth) + (2 * filledWidth),
    (4 * emptySpaceWidth) + (3 * filledWidth),
    (5 * emptySpaceWidth) + (4 * filledWidth),
  ]

  const dateMarginTop = imageHeight * 0.37
  const dateHeight = imageHeight * 0.04

  const days = []

  for (let i = 0; i < 5; i++) {
    const menuCrop = image.clone().crop({
      h: height,
      w: filledWidth,
      x: crops[i],
      y: marginTop,
    })
    const dateCrop = image.clone().crop({
      h: dateHeight,
      w: filledWidth,
      x: crops[i],
      y: dateMarginTop,
    })
    days.push(await getText(menuCrop, dateCrop))
  }
  console.log(JSON.stringify(days))

  for (const dia of days) {
    const versions = await verifyVersion(dia.date)

    if (versions.length === 0) {
      await saveToDynamoDB(dia, 1)
      continue
    }

    let maior = versions[0]
    for (const v of versions) {
      if (parseInt(v.versao.N) > parseInt(maior.versao.N)) {
        maior = v
      }
    }

    if (maior.texto.S.trim() !== dia.text.trim()) {
      await saveToDynamoDB(dia, parseInt(maior.versao.N) + 1)
    }
  }
}
async function getText(cropped, croppedData) {
  const worker = await createWorker("eng")

  const buffer = await cropped.getBuffer("image/png")
  const bufferData = await croppedData.getBuffer("image/png")

  let textoReconhecido = await worker.recognize(buffer)
  const data = await worker.recognize(bufferData)
  let texto = textoReconhecido.data.text

  const response = await client.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      { role: 'system', content: 'Você irá ajudar a refinar textos extraídos de um OCR. É necessário corrigir a grafia e formato do texto. Os textos são opções de refeições, use isso para preencher melhor as palavras. O formato da responsta deve ser exclusivamente JSON com uma única propriedade "text". A resposta com qualquer outro formato ou propriedades causará erros.' },
      { role: 'user', content: texto }
    ],
    response_format: { type: 'json_object' }
  });

  texto = JSON.parse(response.choices[0].message.content)
  if (typeof texto !== 'object' || typeof texto.text != 'string') {
    console.error(`O chatgpt respondeu num formato inválido: ` + JSON.stringify(texto))
    const outraTentativa = await getText(cropped, croppedData)
    return outraTentativa
  }

  await worker.terminate()

  return {
    text: texto.text,
    date: data.data.text.trim(),
  }
}

async function saveToDynamoDB(menu, versao) {
  if (!menu.date) {
    console.log("Data inválida, não será salva:", menu)
    return
  }

  const params = {
    TableName: "lanchonete",
    Item: {
      data: { S: String(menu.date).trim() },
      texto: { S: String(menu.text || "").trim() },
      versao: { N: String(versao) },
    },
  }

  await dynamo.send(new PutItemCommand(params))
  console.log("SALVANDO NO DYNAMO:", menu.date, versao)
}


async function verifyVersion(date) {
  const params = {
    TableName: "lanchonete",
    KeyConditionExpression: "#d = :d",
    ExpressionAttributeNames: { "#d": "data" },
    ExpressionAttributeValues: { ":d": { S: String(date).trim() } },
    ConsistentRead: true,
  }

  const data = await dynamo.send(new QueryCommand(params))
  return data.Items ?? []
}
//module.exports.handler = handler
//handler()
