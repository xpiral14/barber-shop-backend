import { Model, DataTypes } from "sequelize";

export default class Gender extends Model {
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
}
