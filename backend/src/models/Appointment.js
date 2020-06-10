import Sequelize, { Model, DataTypes } from 'sequelize';
import Company from './Company';
import User from './User';

export default class Appointment extends Model {
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
          references: {
            model: 'Companies',
            key: 'id',
          },
        },

        barberId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
          },
        },

        serviceId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'Services', key: 'id' },
        },
        costumerId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
          },
        },

        date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        time: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        canceledAt: {
          type: Sequelize.DATE,
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(Company);
    this.belongsTo(User, { foreignKey: 'barberId', as: 'barber' });
    this.belongsTo(User, { foreignKey: 'costumerId', as: 'costumer' });
    this.belongsTo(models.Service, {
      foreignKey: 'serviceId',
      as: 'service',
    });
  }
}
