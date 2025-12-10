import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { eachDayOfInterval, startOfWeek, addDays} from "date-fns";
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

export async function getWeeklyMenu(tableName, diasDaSemana){
 const segunda = await getMenuOfTheDayList(tableName,diasDaSemana[0])
 const terca = await getMenuOfTheDayList(tableName,diasDaSemana[1])
 const quarta = await getMenuOfTheDayList(tableName,diasDaSemana[2])
 const quinta = await getMenuOfTheDayList(tableName,diasDaSemana[3])
 const sexta = await getMenuOfTheDayList(tableName,diasDaSemana[4])

 return [segunda,terca,quarta,quinta,sexta]
}

export async function getWeeklyMenuRest(semana){
 const menuRestaurante = await getWeeklyMenu('menu', semana);
 return menuRestaurante
}
export async function getWeeklyMenuLan(){
const menuLanchonete = await getWeeklyMenu('lanchonete', semana);
return menuLanchonete
}

export default async function handler(semana){
const semana = await getWeekDates()
const restMenu = getWeeklyMenuRest(semana)
const lanMenu = getWeeklyMenuLan(semana)


   return {
        restaurante: restMenu,
        lanchonete: lanMenu
    };
}
//handler()