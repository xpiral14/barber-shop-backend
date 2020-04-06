import { Model, DataTypes } from "sequelize";
export default class CompanyAddress extends Model {
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
        },
        cep: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        state: {
          type: DataTypes.STRING(100),
        },
        city: {
          type: DataTypes.STRING(100),
        },
        neighborhood: {
          type: DataTypes.STRING(100),
        },
        street: {
          type: DataTypes.STRING(100),
        },
        number: {
          type: DataTypes.STRING(100),
        },
      },
      { sequelize }
    );
  }
}