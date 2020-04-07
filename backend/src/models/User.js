import { Model, DataTypes } from "sequelize";
import UserType from "./UserType";
import hashPassword from "../utils/hashPassword";
import { registered } from "../constants/messages";

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
            model: "Companies",
            key: "id",
          },
        },
        userTypeId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Users",
            key: "id",
          },
        },
        genderId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Genders",
            key: "id",
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
              return User.findOne({ where: { email }, attributes: ["email"] })
                .then((data) => {
                  if (!!data) throw new Error(registered("email"));
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
            this.setDataValue("password", val);
          },
        },
      },
      {
        sequelize,
        defaultScope: {
          include: [{ model: UserType, as: "userType" }],
          attributes: {
            exclude: ["passwordHash"],
          },
        },
        hooks: {
          beforeCreate(model, options) {
            if (model.password) {
              model.passwordHash = hashPassword(model.password);
            }
          },
        },
        timestamps: true,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Company, { as: "company" });
    this.belongsTo(models.Gender, { as: "gender" });
    this.belongsTo(models.UserType, { as: "userType" });
    this.hasOne(models.UserAddress, { as: "address" });
    this.hasMany(models.UserPhone, { as: "phones" });
  }
}
