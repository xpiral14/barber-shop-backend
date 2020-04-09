import { Model, DataTypes } from 'sequelize';
import hashPassword from '../utils/hashPassword';
import { exists, registered } from '../constants/messages';
import CompanyAddress from './CompanyAddress';
import CompanyPhone from './CompanyPhone';

const { parseFromTimeZone, formatToTimeZone } = require('date-fns-timezone');
export default class Company extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },

        fantasyName: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },

        logo: {
          type: DataTypes.STRING(200),
        },
        cnpj: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,

          validate: {
            exists(cnpj) {
              return Company.findOne({
                where: {
                  cnpj,
                },
              })
                .then((data) => {
                  if (!!data) throw new Error(exists('barbearia', 'cnpj', 'f'));
                })
                .catch((err) => {
                  throw err;
                });
            },
          },
        },
        email: {
          type: DataTypes.STRING(150),
          allowNull: false,
          unique: true,
          validate: {
            emailExists(email) {
              return Company.findOne({ where: { email }, attributes: ['email'] })
                .then((data) => {
                  if (!!data) throw new Error(registered('email'));
                })
                .catch((err) => {
                  throw err;
                });
            },
          },
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
          include: [
            {
              model: CompanyAddress,
              as: 'addresses',
            },
            {
              model: CompanyPhone,
              as: 'companyPhones',
            },
          ],
          attributes: {
            exclude: ['passwordHash'],
          },
        },
        hooks: {
          beforeCreate(model, options) {
            let timezone = 'America/Sao_Paulo';
            if (model.password) {
              model.passwordHash = hashPassword(model.password);

              const utcDate = parseFromTimeZone(new Date(), {
                timeZone: 'America/Sao_Paulo',
              });

              // Set the output to "1.9.2018 18:01:36.386 GMT+02:00 (CEST)"
              const date = new Date('2018-09-01Z16:01:36.386Z');
              const format = 'D.M.YYYY HH:mm:ss.SSS [GMT]Z (z)';
              const output = formatToTimeZone(date, format, { timeZone: 'Europe/Berlin' });
            }
          },
        },
      }
    );
  }

  static associate(models) {
    this.hasMany(models.CompanyAddress, { as: 'addresses' });
    this.hasMany(models.User, { as: 'users' });
    this.hasMany(models.CompanyPhone, { as: 'companyPhones', foreignKey: 'companyId' });
    this.belongsToMany(models.Service, {
      through: 'UserServices',
      foreignKey: 'companyId',
      as: 'services',
    });
  }
}
