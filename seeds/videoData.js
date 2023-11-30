const { Video } = require('../models');

const videoData = [
  {
    title: 'Crazy Video 1',
    description: 'Description for Crazy Video 1',
    videoUrl: 'https://example.com/video1.mp4',
    duration: 120,
    uploadDate: new Date('April 20, 2021 07:00:00'),
  },
  {
    title: 'Crazy Video 2',
    description: 'Description for Crazy Video 2',
    videoUrl: 'https://example.com/video2.mp4',
    duration: 180,
    uploadDate: new Date('June 22, 2021 09:00:00'),
  },
  {
    title: 'Crazy Video 3',
    description: 'Description for Crazy Video 3',
    videoUrl: 'https://example.com/video3.mp4',
    duration: 150,
    uploadDate: new Date('September 23, 2023 08:30:00'),
  },
  {
    title: 'Crazy Video 4',
    description: 'Description for Crazy Video 4',
    videoUrl: 'https://example.com/video4.mp4',
    duration: 200,
    uploadDate: new Date('December 22, 2022 11:00:00'),
  },
];

const seedVideos = () => Video.bulkCreate(videoData);

module.exports = seedVideos;