import { Model, DataTypes } from "sequelize";

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        companyId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Companies",
            key: "id",
          },
        },
        userTypeId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Users",
            key: "id",
          },
        },
        genderId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Genders",
            key: "id",
          },
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(150),
          allowNull: false,
          unique: true,
        },
        passwordhash: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
      },
      { sequelize }
    );
  }
}