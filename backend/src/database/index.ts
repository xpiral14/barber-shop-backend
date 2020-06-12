import { readdir } from 'fs';
import path from 'path';
// import { Sequelize } from 'sequelize';
import dbConfig from '../config/database';
import mongoose from 'mongoose';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

class Database {
  public connection: Sequelize;
  constructor() {
    this.connection = new Sequelize(
      dbConfig.database as string,
      dbConfig.username as string,
      dbConfig.password as string,
      dbConfig as SequelizeOptions
    );
    this.testConection();
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

  mongo() {
    mongoose
      .connect('mongodb://localhost:27017/barber-shop', {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Conected with mongo');
      })
      .catch((error: any) => {
        throw error;
      });
  }
}

export default new Database();
