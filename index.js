const server = require("./src/app");
const { conn } = require("./src/db.js");
require("dotenv").config();
const { PORT } = process.env;
//const fillBdd = require ("./src/controllers/fillBdd")
// Syncing all the models at once.
async function main() {
  try {
    // Autenticar la conexión con la base de datos
    await conn.authenticate();
    console.log("Connection has been established successfully.");
    // Sincronizar el modelo de la base de datos
    conn.sync({  force: true /*alter: true*/ }).then(() => {
      // Iniciar el servidor web en el puerto especificado
      server.listen(PORT, () => {
        console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
      });
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
