const { Sequelize } = require('sequelize');
const challengeModel = require('./Challenge.js');
const userModel = require('./User.js');
const videoModel = require('./Video.js');
const voteModel = require('./Vote.js');
const sequelize = require('../config/connection.js');

// Define models
const Challenge = new challengeModel(sequelize, Sequelize);
const User = userModel(sequelize, Sequelize);
const Video = videoModel(sequelize, Sequelize);
const Vote = voteModel(sequelize, Sequelize);

// Establish associations
User.hasMany(Video);
Video.hasMany(Vote);
Vote.belongsTo(User);

// Export your models and sequelize instance
module.exports = { sequelize, Challenge, User, Video, Vote };
