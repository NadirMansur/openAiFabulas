// This code is for v4 of the openai package: npmjs.com/package/openai
//import OpenAI from "openai";
const axios = require("axios");
const OpenAI = require("openai");
//require("dotenv").config();
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const eliminarVacio = require("./eliminarVacio")

const crearFabula = require("./crearFabula");



const tareaProgramada = async () => {
  console.log("Tarea programada en ejecucion.");
 await  eliminarVacio()
 await crearFabula();
 await  eliminarVacio()
};

module.exports = tareaProgramada;