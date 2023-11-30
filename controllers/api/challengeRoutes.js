const express = require('express');
const router = express.Router();
const { Challenge, Vote } = require('../models');

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
  const { challengeId } = req.body;
  const userId = req.user.id; // Assuming you have user authentication middleware

  try {
    // Check if the user has already voted for this challenge
    const existingVote = await Vote.findOne({ where: { userId, challengeId } });
    if (existingVote) {
      return res.redirect('/vote?success=false'); // Redirect with a failure message
    }

    // Create a new vote record in the database
    await Vote.create({ userId, challengeId });

    // Update the vote count for the selected challenge in the database
    await Challenge.increment('voteCount', { where: { id: challengeId } });

    // Redirect to the weekly challenges page with a success message
    res.redirect('/vote?success=true');
  } catch (error) {
    console.error('Error submitting vote for weekly challenge:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
