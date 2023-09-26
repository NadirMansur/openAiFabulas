// This code is for v4 of the openai package: npmjs.com/package/openai
//import OpenAI from "openai";
const axios = require("axios");
const OpenAI = require("openai");
require("dotenv").config();
const { OPENAI_API_KEY } = process.env;

console.log("OpenAI");
console.log(OPENAI_API_KEY);
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const personajes = [
  "Luna",
  "Sol",
  "Estrella",
  "Aurora",
  "Nube",
  "Río",
  "Monte",
  "Bosque",
  "Flor",
  "Mariposa",
  "Zorro",
  "Conejo",
  "Lobo",
  "Oso",
  "León",
  "Cuervo",
  "Tortuga",
  "Ratón",
  "Sapo",
  "Ardilla",
  "Dragón",
  "Cisne",
  "Gaviota",
  "Tortuga",
  "Perdiz",
  "Topo",
  "Abeja",
  "Colibrí",
  "Caracol",
  "Grillo",
  "Serpiente",
  "Cebra",
  "Jirafa",
  "Elefante",
  "Tigre",
  "Halcón",
  "Paloma",
  "Delfín",
  "Orca",
  "Pulpo",
  "Cangrejo",
  "Tiburón",
  "Camaleón",
  "Rana",
  "Cocodrilo",
  "Hiena",
  "Pantera",
  "Gorila",
  "Koala",
  "Panda",
  "Hormiga",
  "Mariquita",
  "Araña",
  "Cucaracha",
  "Saltamontes",
  "Gusanito",
  "Ciempiés",
  "Lombriz",
  "Avestruz",
  "Pingüino",
  "Cisne",
  "Gorrión",
  "Águila",
  "Halcon",
  "Pavo",
  "Búho",
  "Colibrí",
  "Cóndor",
  "Halcón",
  "Lechuza",
  "Alce",
  "Ciervo",
  "Cabra",
  "Vaca",
  "Toro",
  "Gallo",
  "Pato",
  "Cisne",
  "Conejo",
  "Gato",
  "Perro",
  "Pez",
  "Tortuga",
  "Ardilla",
  "Castor",
  "Nutria",
  "Erizo",
  "Murciélago",
  "Delfín",
  "Ballena",
  "Tiburón",
  "Esturión",
];

const ensenanzas = [
  "Honestidad",
  "Generosidad",
  "Amistad",
  "Responsabilidad",
  "Respeto",
  "Humildad",
  "Trabajo en equipo",
  "Perseverancia",
  "Sacrificio",
  "Tolerancia",
  "Empatía",
  "Agradecimiento",
  "Paciencia",
  "Solidaridad",
  "Optimismo",
  "Superación",
  "Justicia",
  "Cooperación",
  "Integridad",
  "Aprender de los errores",
  "Valentía",
  "Aprender a compartir",
  "Aprender a perdonar",
  "No juzgar por las apariencias",
  "La importancia de la familia",
  "El valor de la amistad",
  "La importancia de decir la verdad",
  "El poder de la perseverancia",
  "No subestimar a los demás",
  "La importancia de ser uno mismo",
  "El valor de la diversidad",
  "Aprender a ser agradecido",
  "La importancia de cuidar el medio ambiente",
  "No ser codicioso",
  "La importancia de la paciencia",
  "El valor de la bondad",
  "No envidiar a los demás",
  "Aprender a respetar a los demás",
  "La importancia de ser humilde",
  "El valor de la lealtad",
  "No ser egoísta",
  "Aprender a superar los miedos",
  "La importancia de la justicia",
  "El valor de la honestidad",
  "No discriminar a los demás",
  "Aprender a ser valiente",
  "La importancia de la educación",
  "El valor de la compasión",
  "No ser vanidoso",
  "Aprender a ser responsable",
  "La importancia de la empatía",
  "El valor de la perseverancia",
  "No ser orgulloso",
  "La importancia de la solidaridad",
  "El valor de la integridad",
  "No ser vengativo",
  "La importancia de la gratitud",
  "El valor de la tolerancia",
  "No ser materialista",
  "Aprender a compartir",
  "La importancia de la autenticidad",
  "No ser prejuicioso",
  "El valor de la paciencia",
  "La importancia de la cooperación",
];

function pickRandom(array, quantity) {
  if (quantity <= 0) {
    return "quantity debe ser mayor a 0";
  }

  const shuffledArray = array.slice().sort(() => Math.random() - 0.5); // Mezcla el array

  const selectedElements = shuffledArray.slice(0, quantity);

  return selectedElements.join(", ");
}

const responseFunctions = async () => {
  const animales = pickRandom(personajes, 3);
  const moraleja = pickRandom(ensenanzas, 1);

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
    console.log(response.choices[0].message.content);
    textoImage(response.choices[0].message.content);
  } catch (e) {
    console.log(e);
  }
};

const textoImage = async (texto) => {
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
            "resume este texto describiendo una imagen ilutrativa de la situacion, en un maximo de 1000 caracteres",
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
    console.log("texto imagen", response.choices[0].message.content);
    imageCreate(response.choices[0].message.content);
  } catch (e) {
    console.log(e);
  }
};

const imageCreate = async (instruccion) => {
  const prompt = instruccion;
  const size = "512x512";
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt: prompt,
        n: 1,
        size: size,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    const image_url = response.data.data[0].url;
    console.log(image_url);
  } catch (error) {
    console.error("imageCreate error:", error.message);
    console.error("imageCreate error:");
    console.error(error.response.data.error);
  }
};

responseFunctions();
