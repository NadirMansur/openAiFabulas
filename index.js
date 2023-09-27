const server = require("./src/app");
const { conn } = require("./src/db.js");
const cron = require('node-cron');
require("dotenv").config();
const { PORT } = process.env;
const asyncForEach = require("./src/controllers/cargarPersonajes")
const asyncCrearMoraleja = require("./src/controllers/cargarMoraleja")
const tareaProgramada = require("./src/controllers/openAi")
//const fillBdd = require ("./src/controllers/fillBdd")
// Syncing all the models at once.
async function main() {
  try {
    // Autenticar la conexión con la base de datos
    await conn.authenticate();
    console.log("Connection has been established successfully.");
    // Sincronizar el modelo de la base de datos
    conn.sync({ /*force: true*/ alter: true }).then(() => {
      // Iniciar el servidor web en el puerto especificado
      server.listen(PORT, () => {
        console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
        asyncForEach()
        asyncCrearMoraleja()
        // Ejecutar la tarea todos los días a las 2:30 PM
        cron.schedule("33 * * * *", () => {
          // Coloca aquí el código que deseas ejecutar
          console.log("Tarea programada ejecutada.");
          tareaProgramada()
        });
      });
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
