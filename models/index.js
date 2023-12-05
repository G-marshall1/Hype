console.log('Executing models/index.js');

const { Sequelize, DataTypes } = require('sequelize');
const challengeModel = require('./challenge.js');
const userModel = require('./user.js');
const videoModel = require('./video.js');
const voteModel = require('./vote.js');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

// Define models
const Challenge = challengeModel(sequelize, DataTypes);
const User = userModel(sequelize, DataTypes);
const Video = videoModel(sequelize, DataTypes);
const Vote = voteModel(sequelize, DataTypes);

// Establish associations
User.hasMany(Video);
Video.hasMany(Vote);

// Export your models and sequelize instance
module.exports = { sequelize, Challenge, User, Video, Vote };
