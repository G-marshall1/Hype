const express = require('express');
const router = express.Router();
const { Video, User } = require('../models');

// Route to render the video submissions page
router.get('/', async (req, res) => {
  try {
    // Fetch video submissions with user information
    const videos = await Video.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });

    res.render('video', { videos });
  } catch (error) {
    console.error('Error fetching video submissions:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle video submission form
router.post('/submit', async (req, res) => {
  try {
    const { userId, videoUrl } = req.body; // Assuming you have form fields for userId and videoUrl

    // Create a new video record in the database
    const newVideo = await Video.create({
      userId,
      videoUrl,
      // Add other fields as needed
    });

    // Redirect to the video submissions page
    res.redirect('/video');
  } catch (error) {
    console.error('Error submitting video:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle voting form
router.post('/vote', async (req, res) => {
  try {
    const { videoId } = req.body; // Assuming you have a form field for videoId

    // Retrieve the video from the database
    const video = await Video.findByPk(videoId);

    if (!video) {
      return res.status(404).send('Video not found');
    }

    // Update the vote count for the selected video (modify this based on your database schema)
    video.votes += 1;

    // Save the updated video in the database
    await video.save();

    // Redirect to the video submissions page
    res.redirect('/video');
  } catch (error) {
    console.error('Error submitting vote:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
