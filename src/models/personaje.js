const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Personaje",
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
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { paranoid: true }
  );
};
