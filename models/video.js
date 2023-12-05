const { Sequelize, DataTypes } = require('sequelize');

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
    defaultValue: Sequelize.fn('NOW'), // Set default time stuff
  },
}, {
  timestamps: true, // Timestampo stuff
});

module.exports = Video;

// needs to be checked to make sure it's getting to right db