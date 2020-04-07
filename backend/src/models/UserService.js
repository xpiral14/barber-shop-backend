import { Model, DataTypes } from "sequelize";

export default class UserService extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.Company, { as: "company" });
    this.belongsTo(models.User, { as: "client", foreignKey: "clientId" });
    this.belongsTo(models.User, { as: "employee", foreignKey: "employeeId" });
  }
}
