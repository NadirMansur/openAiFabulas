const axios = require("axios");
const { Fabula } = require("../db");
const cloudinary = require("../utils/cloudinary");

const { OPENAI_API_KEY } = process.env;
const crearFabula = require("./crearFabula");

const imageCreate = async (instruccion, id) => {
  console.log("imageCreate en ejecucion.");

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
    if (image_url === null) crearFabula();
    ///////////////////////
    const file = await cloudinary(image_url);

    fabulaBdd.image = file;
    await fabulaBdd.save();
    ///////////////////////////
    console.log("fabulaBdd.image creada");
  } catch (error) {
    console.error("imageCreate error:", error.message);
    console.error("imageCreate error:");
    console.error(error.response.data.error);
  }
};

module.exports = imageCreate;
