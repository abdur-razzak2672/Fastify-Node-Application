require('dotenv').config();


const { Sequelize } = require('sequelize');
console.log('DB Name:', process.env.DB_NAME);
console.log('DB User:', process.env.DB_USER);
console.log('DB Password:', process.env.DB_PASSWORD);
console.log('DB Host:', process.env.DB_HOST);
console.log('DB Port:', process.env.DB_PORT);


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432 ,
    dialect: 'postgres',
    logging: false,
  }
);


module.exports = sequelize;
