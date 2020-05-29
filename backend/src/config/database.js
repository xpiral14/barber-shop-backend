require('dotenv').config();
module.exports = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  dialectOptions: {
    useUTC: false, //for reading from database
    timezone: 'Etc/GMT0',
  },
  dialect: 'mariadb',
  define: {
    timestamps: true,
    underscored: false,
    underscoredAll: false,
  },
};
