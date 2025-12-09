import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { eachDayOfInterval, startOfWeek, endOfWeek, addDays, parseJSON } from "date-fns";
const client = new DynamoDBClient({ region: 'sa-east-1' });


const teste = new Date("2025-12-03")
const inicio = startOfWeek(teste, { weekStartsOn: 1 })
const endDate = addDays(inicio, 4)

const result = eachDayOfInterval({
  start: inicio,
  end: endDate
})

const arrayFormatado = []

// for(let i = 0; i < result.length; i++){
//   const dataFormatada = result[i].toISOString().substring(0,10).replaceAll("-","/")
//     arrayFormatado.push(dataFormatada)
  
// }
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
console.log(arrayFormatado)