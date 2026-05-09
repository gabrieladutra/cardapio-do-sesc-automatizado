import { getRestMessage, getLanMessage } from "./dailyMenu.js";

async function sendMessage(mensagem) {
  const response = await fetch(
    "https://telegram-home-bot.petersonv.click/send-menu",
    {
      method: "POST",
      body: JSON.stringify({
        message: mensagem,
      }),
      headers: {
        "x-auth-token": "56883cc2-8570-477f-9565-ab804d58336b",
      },
    },
  );
  if (!response.ok)
    throw new Error(`Erro na requisição. Status: ` + response.status);
  console.log(`Message sent to telegram`);
}

export default async function handler() {
  const restMsg = await getRestMessage();
  const lanMsg = await getLanMessage();

  await sendMessage(`Menu Restaurante: ${restMsg}`);
  await sendMessage(`Menu Lanchonete: ${lanMsg}`);
}
//handler();
