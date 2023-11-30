const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const seedProjects = require('./videoData');
const { User, Project } = require('../models'); // Import User and Project models

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  await seedProjects();

  process.exitCode = 0;
  process.exit();
};

seedAll();