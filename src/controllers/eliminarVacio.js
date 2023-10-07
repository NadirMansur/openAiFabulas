const { Fabula } = require("../db");

const eliminarVacio = async () => {
  try {
    const all = await Fabula.findAll({
      attributes: ["id", "image", "texto", "moraleja", "personajes"],
    });
    if (all.length !== 0) {
      for (const fabula of all) {
        try {
          if (
            fabula.image === null ||
            fabula.texto === null ||
            fabula.moraleja === null ||
            fabula.personajes === null
          ) {
            const registroAEliminar = await Fabula.findByPk(fabula.id);
            await registroAEliminar.destroy();
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
};
module.exports = eliminarVacio;
