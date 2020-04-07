import fs, { readdir } from "fs";
import { promisify } from "util";
import path from "path";
import { Sequelize } from "sequelize";
import dbConfig from "../config/database";
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
  }

  async testConection() {
    try {
      await this.connection.authenticate();
      console.log("connected with db");
    } catch (error) {
      console.log("error trying to connect to db");
    }
  }
  async importModels() {
    readdir(path.join(__dirname, "../models"), async (err, files) => {
      if (err) {
        console.log(err);
        return;
      }
      let models = await Promise.all(
        files.map(async (file) => {
          let model = (
            await import(path.join(__dirname, "../models", `/${file}`))
          ).default;
          model.init(this.connection);
          return model;
        })
      );

      models.map(
        (model) => model.associate && model.associate(this.connection.models)
      );
    });
  }
}

new Database();
