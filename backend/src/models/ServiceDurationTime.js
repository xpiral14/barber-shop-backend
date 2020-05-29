import { Model, DataTypes } from 'sequelize';

export default class ServiceDurationTime extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        barberId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Users',
            key: 'id',
          },
          allowNull: false,
        },
        duration: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
        },
        extendTime: {
          type: DataTypes.INTEGER,
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'barberId', as: 'barber' });
  }
}
