const { VideoPost } = require('../models');

const videoPostData = [
    {
        "title": "A cool video",
        "content": "cool video content"
      },
      {
        "title": "Cool video 2",
        "content": "cool video content 2"
      },
      {
        "title": "Roll 'Em Up",
        "content": "cool video content 3"
      }
];

const seedVideoPosts = async () => {
    try {
      await VideoPost.bulkCreate(videoPostData);
      console.log('VideoPost data seeded successfully.');
    } catch (error) {
      console.error('Error seeding video post data:', error);
    }
  };

module.exports = seedVideoPosts;