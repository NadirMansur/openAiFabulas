// This code is for v4 of the openai package: npmjs.com/package/openai
//import OpenAI from "openai";
const axios = require("axios");
const OpenAI = require("openai");
//require("dotenv").config();
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const { OPENAI_API_KEY } = process.env;
const { Fabula, Personaje, Moraleja } = require("../db");

console.log("OpenAI");
console.log(OPENAI_API_KEY);
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const tareaProgramada = () => {
  const crearFabula = async () => {
    const arrayPersonajes = [];
    const arrayEnsenanzas = [];
    try {
      const personajes = await Personaje.findAll({
        attributes: ["name"],
      });
      if (personajes.length === 0) console.log({ error: "personajes Not Found" });
      // console.log(personajes);
      // console.log(personajes.length);
      personajes.forEach((personaje) => {
        arrayPersonajes.push(personaje.dataValues.name);
      });
      //console.log(arrayPersonajes);
      const animales = pickRandom(arrayPersonajes, 3);
      console.log(animales);
      const ensenanzas = await Moraleja.findAll({
        attributes: ["text"],
      });
      if (ensenanzas.length === 0) console.log({ error: "ensenanzas Not Found" });
      //console.log(ensenanzas);
      ensenanzas.forEach((ensenanza) => {
        arrayEnsenanzas.push(ensenanza.dataValues.text);
      });
      const moraleja = pickRandom(arrayEnsenanzas, 1);
      console.log(moraleja);
      const responseFunctions = async () => {
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
          console.log(response.choices[0].message.content);
          return response.choices[0].message.content;
        } catch (e) {
          console.log(e);
        }
      };
      const fabula = await responseFunctions();
      //console.log(fabula);
      // console.log(moraleja);
      // console.log(animales);
      const crearFabula = await Fabula.create({
        texto: fabula,
        moraleja: moraleja,
        personajes: animales.split(", "),
      });
      console.log("-------------");
      console.log(crearFabula.dataValues.id);
      console.log("-------------");
      textoImage(fabula, crearFabula.dataValues.id);
    } catch (error) {
      console.log(error);
    }
  };
  
  function pickRandom(array, quantity) {
    if (quantity <= 0) {
      return "quantity debe ser mayor a 0";
    }
  
    const shuffledArray = array.slice().sort(() => Math.random() - 0.5); // Mezcla el array
  
    const selectedElements = shuffledArray.slice(0, quantity);
  
    return selectedElements.join(", ");
  }
  
  const textoImage = async (texto, id) => {
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
      console.log("texto imagen", response.choices[0].message.content);
      imageCreate(response.choices[0].message.content, id);
    } catch (e) {
      console.log(e);
    }
  };
  
  const imageCreate = async (instruccion, id) => {
    const prompt = instruccion;
    const size = "512x512";
    const fabulaBdd = await Fabula.findByPk(id);
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
      ///////////////////////
      fabulaBdd.image = image_url;
      await fabulaBdd.save();
      ///////////////////////////
    } catch (error) {
      console.error("imageCreate error:", error.message);
      console.error("imageCreate error:");
      console.error(error.response.data.error);
    }
  };
  crearFabula();
};

module.exports = tareaProgramada;