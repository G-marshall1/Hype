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
    // Handle video submission logic here
    // For example, create a new video record in the database

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
    // Handle voting logic here
    // For example, update the vote count for the selected video in the database

    // Redirect to the video submissions page
    res.redirect('/video');
  } catch (error) {
    console.error('Error submitting vote:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
