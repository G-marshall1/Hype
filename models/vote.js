const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const Vote = sequelize.define('Vote', {
  // Define fields for votes
  voteType: {
    type: DataTypes.ENUM('upvote', 'downvote'), // Can customize the vote types as needed
    allowNull: false,
  },
});

// Define associations
Vote.belongsTo(User);
Vote.belongsTo(Video);

module.exports = Vote;