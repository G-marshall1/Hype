const { Sequelize } = require('sequelize');
const challengeModel = require('./challenge.js');
const userModel = require('./user.js');
const videoModel = require('./video.js');
const voteModel = require('./vote.js');

const sequelize = new Sequelize('hype_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

// Define models
const Challenge = challengeModel(sequelize, Sequelize);
const User = userModel(sequelize, Sequelize);
const Video = videoModel(sequelize, Sequelize);
const Vote = voteModel(sequelize, Sequelize);

// Export your models and sequelize instance
module.exports = { sequelize, Challenge, User, Video, Vote };