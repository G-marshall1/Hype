const { Sequelize, DataTypes } = require('sequelize');

const Vote = sequelize.define('Vote', {
  voteType: {
    type: DataTypes.ENUM('upvote', 'downvote'),
    allowNull: false,
    defaultValue: 'upvote', // Set the default value
    validate: {
      isIn: [['upvote', 'downvote']],
    },
  },
}, {
  timestamps: true, // Enable timestamps
});

// Define associations
Vote.belongsTo(User);
Vote.belongsTo(Video);

module.exports = Vote;
