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
        allowNull: false,
      },
      texto: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      moraleja: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      personajes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    { paranoid: true }
  );
};
