const { Sequelize } = require('sequelize');
const challengeModel = require('./Challenge.js');
const userModel = require('./User.js');
const videoModel = require('./video.js');
const voteModel = require('./Vote.js');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

// Define models
const Challenge = challengeModel(sequelize, Sequelize);
const User = userModel(sequelize, Sequelize);
const Video = videoModel(sequelize, Sequelize);
const Vote = voteModel(sequelize, Sequelize);

// Establish associations
User.hasMany(Video);
Video.hasMany(Vote);
Vote.belongsTo(User);

// Export your models and sequelize instance
module.exports = { sequelize, Challenge, User, Video, Vote };
