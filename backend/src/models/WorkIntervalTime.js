import { Model, DataTypes } from "sequelize";


export default class WorkIntervalTime extends Model {
    static init(sequelize){
        super.init({
            id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true,
            },
            barberId:{
              type: DataTypes.INTEGER,
              references:{
                model: "Users",
                key: "id"
              },
              allowNull: false
            },
            initialTime: {
              type: DataTypes.INTEGER,
              allowNull: false,
              unique: true,
            },
            finishTime: {
              type: DataTypes.INTEGER,
              allowNull: false,
            },
            createdAt:{
              type: DataTypes.DATE
            },
            updatedAt:{
              type: DataTypes.DATE
            }
          }, {sequelize, defaultScope: {
            attributes: {
              exclude: ["barberId"]
            }
          }})
    }

    static associate(models){
        this.belongsTo(models.User, {foreignKey: "barberId", as: "barber"})
    }
}