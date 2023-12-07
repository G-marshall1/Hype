const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

module.exports = (sequelize) => {
  const Vote = sequelize.define('Vote', {
    // ... other properties
  });

  return Vote;
};
