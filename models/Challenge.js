console.log('Executing models/Challenge.js');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const Challenge = sequelize.define('Challenge', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 255], // Ensure the title length is between 1 and 255 characters
    },
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: '', // Set a default value if needed
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
  timestamps: true, // Enable timestamps
  indexes: [
    {
      unique: true,
      fields: ['startDate'],
    },
    {
      fields: ['endDate'],
    },
    // Add more indexes as needed
  ],
});

// Associations (if applicable)
// Challenge.hasMany(Vote);

module.exports = Challenge;
