import { Model, DataTypes } from 'sequelize';

export default class Service extends Model {
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
        name: {
          type: DataTypes.STRING,
        },
        price: {
          type: DataTypes.FLOAT(10, 2),
        },
      },
      { sequelize, defaultScope: { attributes: { exclude: 'companyId' } } }
    );
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      through: 'BarberServices',
      foreignKey: 'serviceId',
      as: 'barbers',
    });
  }
}
