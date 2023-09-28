const { Moraleja } = require("../db");

const asyncCrearMoraleja = async () => {
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
  for (const item of ensenanzas) {
    try {
      const crearMoraleja = await Moraleja.create({
        text: item,
      });
      //console.log(crearMoraleja);
    } catch (e) {
      console.log("Error", e);
    }
  }
};

module.exports = asyncCrearMoraleja;
