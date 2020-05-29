import { Model, DataTypes } from 'sequelize';
import UserType from './UserType';
import hashPassword from '../utils/hashPassword';
import { registered } from '../constants/messages';
import { EMPLOYEE, CLIENT } from '../constants/userTypes';
import Company from './Company';
import path from 'path';
import Gender from './Gender';
import UserAddress from './UserAddress';
import UserPhone from './UserPhone';
import { backendURL } from '../constants/urls';

export default class User extends Model {
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
          references: {
            model: 'Companies',
            key: 'id',
          },
        },
        userTypeId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
          },
        },
        genderId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Genders',
            key: 'id',
          },
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(150),
          allowNull: false,
          unique: true,
          validate: {
            emailExists(email) {
              return User.findOne({ where: { email }, attributes: ['email'] })
                .then((data) => {
                  if (!!data) throw new Error(registered('email'));
                })
                .catch((err) => {
                  throw err;
                });
            },
          },
        },
        perfilImage: {
          type: DataTypes.STRING,
        },
        perfilImageURL: {
          type: DataTypes.VIRTUAL,
          get: function (value) {
            const perfilImage = this.get('perfilImage');
            return perfilImage ? backendURL + '/static/perfil/' + perfilImage : null;
          },
        },
        birth: {
          type: DataTypes.DATEONLY,
        },
        passwordHash: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.VIRTUAL,
          set(val) {
            this.setDataValue('password', val);
          },
        },
      },
      {
        sequelize,
        defaultScope: {
          include: [{ model: UserType, as: 'userType' }],
          attributes: {
            exclude: ['passwordHash', 'companyId', 'userTypeId', 'genderId'],
          },
          include: [
            { model: UserType, as: 'userType' },
            { model: Gender, as: 'gender' },
            { model: UserAddress, as: 'address' },
            { model: UserPhone, as: 'phones' },
          ],
        },
        hooks: {
          beforeCreate(model, options) {
            if (model.password) {
              model.passwordHash = hashPassword(model.password);
            }
          },
        },
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Company, { as: 'company' });
    this.belongsTo(models.Gender, { as: 'gender' });
    this.belongsTo(models.UserType, { as: 'userType' });
    this.hasMany(models.UserAddress, { as: 'address' });
    this.hasMany(models.UserPhone, { as: 'phones' });
    this.hasOne(models.ServiceDurationTime, { foreignKey: 'barberId', as: 'serviceDuration' });
    this.hasMany(models.WorkIntervalTime, { foreignKey: 'barberId', as: 'workInterval' });
  }

  static findAllClients(expression) {
    expression.where.userTypeId = CLIENT;
    return this.findAll(expression);
  }

  static findAllEmployees(expression) {
    expression.where.userTypeId = EMPLOYEE;
    return this.findAll(expression);
  }

  static findOneClient(expression) {
    expression.where.userTypeId = CLIENT;
    return this.findOne(expression);
  }
  static findOneEmployee(expression) {
    expression.where.userTypeId = EMPLOYEE;
    return this.findOne(expression);
  }
}
