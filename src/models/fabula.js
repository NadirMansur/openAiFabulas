const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Fabula",
    {
      /// id seria el codigo ISBN del libro ///
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      texto: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      moraleja: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      personajes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    { paranoid: true }
  );
};
