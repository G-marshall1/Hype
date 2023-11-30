const { User } = require('../models');

const userData = [
  {
    username: 'UserOne',
    email: 'userone@email.com',
    password: 'password123',
  },
  {
    username: 'UserTwo',
    email: 'usertwo@email.com',
    password: 'password123',
  },
  {
    username: 'UserThree',
    email: 'userthree@email.com',
    password: 'password123',
  },
  {
    username: 'UserFour',
    email: 'userfour@email.com',
    password: 'password123',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;