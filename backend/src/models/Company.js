import { Model, DataTypes } from "sequelize";

export default class Company extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },

        fantasyName: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        logo: {
          type: DataTypes.STRING(200),
        },
        cnpj: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
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