console.log('Executing models/video.js');

const { DataTypes } = require('sequelize');
const { sequelize } = require('../models/index'); // Import the sequelize instance

const Video = sequelize.define('Video', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 255],
    },
  },
  description: {
    type: DataTypes.TEXT,
  },
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uploadDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
});

module.exports = Video;