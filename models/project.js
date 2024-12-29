"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      // Define associations here (if any)
    }
  }
  Project.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      desc: { type: DataTypes.TEXT, allowNull: false },
      image: DataTypes.STRING,
      startDate: { type: DataTypes.DATE, allowNull: false },
      endDate: { type: DataTypes.DATE, allowNull: false },
      duration: { type: DataTypes.INTEGER, allowNull: false },
      stack: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      }, // Define the type of array (string in this case)
      postedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
