import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { eachDayOfInterval, startOfWeek, endOfWeek, addDays, parseJSON } from "date-fns";
import { getTodayBR } from './dailyMenu.js';
const dynamo = new DynamoDBClient({ region: 'sa-east-1' });

async function getWeekDates(){
const hoje = new Date()
const inicio = startOfWeek(hoje, { weekStartsOn: 1 })
const endDate = addDays(inicio, 4)

const result = eachDayOfInterval({
  start: inicio,
  end: endDate
})

const arrayFormatado = []

for(let i = 0; i < result.length; i++){
  const dataFormatada = result[i]
   let dia = dataFormatada.getDate()
    let mes = dataFormatada.getMonth() + 1
    const ano = dataFormatada.getFullYear()
    if(dia < 10){
      dia = "0" + dia
    }
    if(mes < 10){
      mes = "0" + mes
    }
    arrayFormatado.push(`${dia}/${mes}/${ano}`)
  
}
 return arrayFormatado
}

async function getMenuOfTheDayList(tableName, date) {
    const params = {
        TableName: tableName,
        KeyConditionExpression: "#d = :d",
        ExpressionAttributeNames: { "#d": "data" },
        ExpressionAttributeValues: { ":d": { S: String(date).trim() } },
        ConsistentRead: true,
    };

    const data = await dynamo.send(new QueryCommand(params));
    if (!data.Items || data.Items.length === 0) {
        console.log(`Nenhum item encontrado na tabela ${tableName} para a data:`, date);
        return [];
    }

    return data.Items;
}



export default async function handler(){
  const diasDaSemana = await getWeekDates()
  const hoje = getTodayBR()
  let date = ""
  for(let i = 0; i< diasDaSemana.length; i++){
    if(hoje == diasDaSemana[i]){
      date = hoje
      break;
    }
  }
 
const segunda = await getMenuOfTheDayList('menu',diasDaSemana[0])
const terca = await getMenuOfTheDayList('menu',diasDaSemana[1])
console.log(segunda)
console.log(terca)
}

handler()