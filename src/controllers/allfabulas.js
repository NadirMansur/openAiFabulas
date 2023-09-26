const { Fabula } = require("../db");

const allfabulas = async (req, res, next) => {
  try {
    const fabulas = await Fabula.findAll({
      attributes: ["id", "image", "texto", "moraleja", "personajes"],
    });
    if (fabulas.length === 0)
      return res.status(404).json({ error: "Not Found" });
    return res.send(fabulas);
  } catch (error) {
    next(error);
  }
};

module.exports = allfabulas;
