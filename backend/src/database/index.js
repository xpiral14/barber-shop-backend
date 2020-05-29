import { readdir } from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import dbConfig from '../config/database';
import mongoose from 'mongoose';
class Database {
  constructor() {
    this.connection = new Sequelize(
      dbConfig.database,
      dbConfig.username,
      dbConfig.password,
      dbConfig
    );
    this.testConection();
    this.importModels();
    this.mongo();
  }

  async testConection() {
    try {
      await this.connection.authenticate();
      console.log('connected with mariadb');
    } catch (error) {
      console.log('error trying to connect to mariadb');
    }
  }
  async importModels() {
    readdir(path.join(__dirname, '../models'), async (err, files) => {
      if (err) {
        console.log(err);
        return;
      }
      let models = await Promise.all(
        files.map(async (file) => {
          let model = (await import(path.resolve("src", 'models', file))).default;
          model.init(this.connection);
          return model;
        })
      );

      models.map((model) => model.associate && model.associate(this.connection.models));
    });
  }

  mongo() {
    this.mongoConnection = mongoose
      .connect('mongodb://localhost:27017/barber-shop', {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      })
      .then((value) => {
        console.log('Conected with mongo');
      })
      .catch((error) => {
        throw err;
      });
  }
}

export default new Database();
