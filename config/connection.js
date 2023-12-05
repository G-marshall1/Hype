const Sequelize = require('sequelize');
require('dotenv').config();

// Print the values of environment variables
console.log('Environment Variables:', process.env);

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: '127.0.0.1',
      dialect: 'mysql',
      port: 3306,
    }
  );

  // Log the Sequelize configuration
  console.log('Sequelize Configuration:', {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
  });
}

module.exports = sequelize;

