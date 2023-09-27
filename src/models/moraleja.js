const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Moraleja",
    {
      /// id seria el codigo ISBN del libro ///
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { paranoid: true }
  );
};
