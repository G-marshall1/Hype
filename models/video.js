const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

module.exports = (sequelize) => {
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

  return Video;
};