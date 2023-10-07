const { Fabula, Personaje, Moraleja } = require("../db");
const pickRandom = require("./pickRandom");
const responseFunctions = require("./responseFunctions");
const textoImage = require("./textoImage");

const crearFabula = async () => {
  console.log("crearFabula en ejecucion.");
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

    const fabula = await responseFunctions(animales, moraleja);
    //console.log(fabula);
    // console.log(moraleja);
    // console.log(animales);
    const crearFabula = await Fabula.create({
      texto: fabula,
      moraleja: moraleja,
      personajes: animales.split(", "),
    });
    await textoImage(fabula, crearFabula.dataValues.id);
    console.log("-------------");
   // console.log(crearFabula.dataValues.id);
    console.log("-------------");
  } catch (error) {
    console.log(error);
  }
};

module.exports = crearFabula;
