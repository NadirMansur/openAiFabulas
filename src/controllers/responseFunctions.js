const OpenAI = require("openai");
const { OPENAI_API_KEY } = process.env;
const pickRandom = require("./pickRandom");
//console.log("OpenAI");
//console.log(OPENAI_API_KEY);
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const responseFunctions = async (animales,moraleja) => {
  console.log("responseFunctions en ejecucion.");

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            // "You will be provided with text, and your task is to translate it into emojis. Do not use any regular text. Do your best with emojis only.",
            "De acuerdo los siguientes personajes y a la siguiente moraleja, genera una pequeña fabula, de un maximo de 2200 caracteres",
        },
        {
          role: "user",
          content:
            //"Artificial intelligence is a technology with great promise.",
            `personajes: ${animales}, moraleja: ${moraleja} `,
        },
      ],
      temperature: 0.8,
      max_tokens: 1500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log("usage", response.usage);
    //console.log(response.choices[0].message.content);
    return response.choices[0].message.content;
  } catch (e) {
    console.log(e);
  }
};

module.exports = responseFunctions;
