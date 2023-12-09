console.log('Starting seedAll script...');
const sequelize = require('../config/connection');
const { User, VideoPost } = require('../models');
const userData = require('./userData.js');
const hypeData = require('./hypeData.js');

const seedAll = async () => {
  console.log('Inside seedAll function...');
  try {
    await sequelize.sync({ force: true });

    await userData();
    console.log('User data seeded successfully.');

    await hypeData();
    console.log('VideoPost data seeded successfully.');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedAll();
