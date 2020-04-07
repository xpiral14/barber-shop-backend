import { Model, DataTypes } from "sequelize";

export default class Service extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        price: {
          type: DataTypes.FLOAT(10, 2),
        },
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Company, { through: "UserServices" });
    this.belongsToMany(models.User, { through: "UserServices" });
  }
}
