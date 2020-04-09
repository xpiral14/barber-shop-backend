import { Model, DataTypes } from 'sequelize';
import User from './User';
import { CLIENT, EMPLOYEE } from '../constants/userTypes';
import Company from './Company';

export default class UserService extends Model {
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
        clientId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        appointment: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        canceled_at: {
          type: DataTypes.DATE,
        },
        employeeId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            isEmployee(id) {
              return User.findOne({
                where: {
                  id,
                  userTypeId: EMPLOYEE,
                },
                attributes: ['id'],
              })
                .then((client) => {
                  if (!client) throw new Error('barbeiro não cadastrado no sistema');
                })
                .catch((err) => {
                  throw err;
                });
            },
          },
        },
      },
      {
        sequelize,
        defaultScope: {
          attributes: {
            exclude: ['companyId', 'clientId', 'employeeId'],
          },
        },
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Company, { as: 'company' });
    this.belongsTo(models.User, { as: 'client', foreignKey: 'clientId' });
    this.belongsTo(models.User, { as: 'employee', foreignKey: 'employeeId' });
  }
}
