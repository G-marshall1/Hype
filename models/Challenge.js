const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

const Challenge = sequelize.define('Challenge', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 255],
    },
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: '',
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['startDate'],
    },
    {
      fields: ['endDate'],
    },
  ],
});

module.exports = Challenge;
