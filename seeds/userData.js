const { User } = require('../models');

const userData = [
    {
        "name": "Sal",
        "email": "sal@hotmail.com",
        "password": "password12345"
    },
    {
        "name": "Lernantino",
        "email": "lernantino@gmail.com",
        "password": "password12345"
    },
    {
        "name": "Amiko",
        "email": "amiko2k20@aol.com",
        "password": "password12345"
    }
];

const seedUsers = async () => {
    try {
        await User.bulkCreate(userData);
        console.log('User data seeded successfully.');
    } catch (error) {
        console.error('Error seeding user data:', error);
    }
};

module.exports = seedUsers;
