const OpenAI = require("openai");
const { OPENAI_API_KEY } = process.env;
const imageCreate = require("./imageCreate");
//console.log("OpenAI");
//console.log(OPENAI_API_KEY);
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const textoImage = async (texto, id) => {
  console.log("textoImage en ejecucion.");

    try {
      //orientado: juegos para mayores de 6 años, artesanales, hechos en madera,
      // en un tono amigable, con el objetico de la venta del producto.
      //agregar todos los hastash relacionads que permita instagram

      //palabras claves:
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              // "You will be provided with text, and your task is to translate it into emojis. Do not use any regular text. Do your best with emojis only.",
              "resume este texto describiendo una imagen ilutrativa de la situacion, en un maximo de 999 caracteres!",
          },
          {
            role: "user",
            content:
              //"Artificial intelligence is a technology with great promise.",
              texto,
          },
        ],
        temperature: 0.8,
        max_tokens: 1500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      console.log("usage", response.usage);
      //console.log("texto imagen", response.choices[0].message.content);
      imageCreate(response.choices[0].message.content, id);
    } catch (e) {
      console.log(e);
    }
  };

  module.exports = textoImage;