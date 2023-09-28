const { Personaje } = require("../db");

const asyncForEach = async () => {
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
  for (const item of personajes) {
    try {
      const crearPersonaje = await Personaje.create({
        name: item,
      });
      //console.log(crearPersonaje);
    } catch (e) {
      console.log("Error", e);
    }
  }
};

module.exports = asyncForEach;
