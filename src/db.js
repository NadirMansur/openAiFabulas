require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, RW_URLdb, RW_USERdb, RW_PORTdb } =
  process.env;

// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/fabulas`,
//   {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// ); 

// Conectar con la DB remota (Railway)
 const sequelize = new Sequelize(
   `postgresql://postgres:${RW_USERdb}@${RW_URLdb}:${RW_PORTdb}/railway`,
   {
     logging: false, // set to console.log to see the raw SQL queries
     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
console.log(sequelize.models);
const {
Fabula,
Personaje,
Moraleja
} = sequelize.models;



//!Revisar todas las relaciones hasMany y pasar a belongto()
// Aca vendrian las relaciones
//(https://www.youtube.com/watch?v=wgLo_0FL0yc
//https://www.youtube.com/watch?v=ocysQ07G4PQ)
//User.hasOne(Address,foreignKey:'UserId'}) añana UserId a la tabla Addresses
//Address.belongsTo(User, {foreignKey:'UserId'}) añana UserId a la tabla Addresses
// luego de una relacion hasOne o HasMay, se genera la relacion BelongsTo
// User.hasMany(Post, {foreignKey:'UserId'}) añade una UserId a la tabla Post
// Post.belongsTo(User, {foreignKey:'UserId'}) // añande una UserId  a la tabla Post

//Relaciones

Fabula.belongsToMany(Personaje, { through: "personaje_fabula" }); //Crea tabla intermedia
Personaje.belongsToMany(Fabula, { through: "personaje_fabula" }); //Crea tabla intermedia

Moraleja.hasMany(Fabula, { foreignKey: 'moralejaId' });
Fabula.belongsTo(Moraleja, { foreignKey: 'moralejaId' });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
