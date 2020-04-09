require('dotenv').config();
module.exports = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-3',
  },
  define: {
    timestamps: true,
    underscored: false,
    underscoredAll: false,
  },
  timezone: '+6:00',
};
