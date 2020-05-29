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
