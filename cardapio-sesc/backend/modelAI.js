import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

let text = "Linguiça 0vo )e codorna &&& molhor de Macaraq"

// const response = await client.responses.create({
//   model: 'gpt-4.1-mini',
//   instructions: 'You are coding a website that displays the restaurant daily and weekly menu. The application retrieves the menu image from an external website, performs OCR, but the text is poorly formatted. I want the return to be a JSON formatted, fill the "text" property. ',
//   input: `${text}`,
// });

const response = await client.chat.completions.create({
  model: 'gpt-4.1-mini',
  messages: [
    { role: 'system', content: 'You are coding a website that displays the restaurant daily and weekly menu. The application retrieves the menu image from an external website, performs OCR, but the text is poorly formatted. I want you to fix the text and the return to be a JSON formatted, fill the "text" property. ' },
    { role: 'user', content: text }
  ],
  response_format: { type: 'json_object' }
});

console.log(JSON.stringify(response, null, 2));
const obj = JSON.parse(response.choices[0].message.content)
console.log(obj.text)