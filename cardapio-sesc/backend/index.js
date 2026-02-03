import { DynamoDBClient, PutItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb"
import { parse } from "node-html-parser"
import { createWorker } from "tesseract.js"
import Jimp from "jimp"

const dynamo = new DynamoDBClient({ region: "sa-east-1" })

export async function handler(event) {
  // CORS preflight
  if (event.requestContext?.http?.method === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: "",
    }
  }

  try {
    await processMenu()

    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify({ ok: true }),
    }
  } catch (error) {
    console.error(error)

    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: "Erro interno" }),
    }
  }
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  }
}

async function processMenu() {
  const response = await fetch(
    "https://www.sescpr.com.br/unidade/sesc-da-esquina/espaco/restaurante-3/"
  )

  const html = await response.text()
  const root = parse(html)
  const img = root.querySelector(".alignnone")
  const src = img.getAttribute("src")

  const image = await Jimp.read(src)
  const imageWidth = image.bitmap.width
  const imageHeight = image.bitmap.height

  const squares = 5
  const emptySpaces = 6
  const proportion = 14.314285714

  const totalEmpty = squares * proportion + emptySpaces
  const emptySpaceWidth = imageWidth / totalEmpty
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

  const dateMarginTop = imageHeight * 0.38
  const dateHeight = imageHeight * 0.04

  const days = []

  for (let i = 0; i < 5; i++) {
    const menuCrop = image.clone().crop(crops[i], marginTop, filledWidth, height)
    const dateCrop = image.clone().crop(crops[i], dateMarginTop, filledWidth, dateHeight)
    days.push(await getText(menuCrop, dateCrop))
  }

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

  const buffer = await cropped.getBufferAsync("image/png")
  const bufferData = await croppedData.getBufferAsync("image/png")

  const texto = await worker.recognize(buffer)
  const data = await worker.recognize(bufferData)

  await worker.terminate()

  return {
    text: texto.data.text,
    date: data.data.text,
  }
}

async function saveToDynamoDB(menu, versao) {
  const params = {
    TableName: "menu",
    Item: {
      data: { S: String(menu.date || "").trim() },
      texto: { S: String(menu.text || "").trim() },
      versao: { N: String(versao) },
    },
  }

  await dynamo.send(new PutItemCommand(params))
}

async function verifyVersion(date) {
  const params = {
    TableName: "menu",
    KeyConditionExpression: "#d = :d",
    ExpressionAttributeNames: { "#d": "data" },
    ExpressionAttributeValues: { ":d": { S: String(date).trim() } },
    ConsistentRead: true,
  }

  const data = await dynamo.send(new QueryCommand(params))
  return data.Items ?? []
}
