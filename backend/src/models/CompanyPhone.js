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
        userId: {
          type: DataTypes.INTEGER,
        },
        phone: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
      },
      { sequelize }
    );
  }
}
