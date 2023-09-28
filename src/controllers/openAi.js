// This code is for v4 of the openai package: npmjs.com/package/openai
//import OpenAI from "openai";
const axios = require("axios");
const OpenAI = require("openai");
//require("dotenv").config();
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const crearFabula = require("./crearFabula");



const tareaProgramada = () => {
  console.log("Tarea programada en ejecucion.");
  crearFabula();
};

module.exports = tareaProgramada;