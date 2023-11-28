const express = require('express');
const router = express.Router();
const { Challenge } = require('../models');

// Route to render the weekly challenges page for voting
router.get('/', async (req, res) => {
  try {
    // Fetch weekly challenges
    const challenges = await Challenge.findAll();

    res.render('vote', { challenges });
  } catch (error) {
    console.error('Error fetching weekly challenges:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle voting for weekly challenges
router.post('/', async (req, res) => {
  try {
    // Handle voting logic for weekly challenges here
    // For example, update the vote count for the selected challenge in the database

    // Redirect to the weekly challenges page
    res.redirect('/vote');
  } catch (error) {
    console.error('Error submitting vote for weekly challenge:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
