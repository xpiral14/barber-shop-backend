import { Model, DataTypes } from "sequelize";

export default class CompanyPhone extends Model {
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
        },
        phone: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
      },
      { sequelize, tableName: "CompanyPhones" }
    );
  }
  static associate(models) {
    this.belongsTo(models.Company, { as: "company" });
  }
}
