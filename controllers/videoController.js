const { Video, Vote, Challenge } = require('../models');

// Render the video submission page
const renderVideoPage = async (req, res) => {
  try {
    // Fetch video submissions with user information
    const videos = await Video.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });

    // Fetch weekly challenges for video submission
    const challenges = await Challenge.findAll();

    res.render('video', { videos, challenges });
  } catch (error) {
    console.error('Error fetching video submissions:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Handle video submission
const handleVideoSubmission = async (req, res) => {
  const { title, description, videoUrl } = req.body;
  const userId = req.user.id; // Assuming you have user authentication middleware

  try {
    // Create a new video record in the database
    const newVideo = await Video.create({ title, description, videoUrl, userId });

    // Redirect to the video submissions page
    res.redirect('/video');
  } catch (error) {
    console.error('Error submitting video:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Handle video voting
const handleVideoVoting = async (req, res) => {
  const { videoId } = req.body;
  const userId = req.user.id; // Assuming you have user authentication middleware

  try {
    // Check if the user has already voted for this video
    const existingVote = await Vote.findOne({ where: { userId, videoId } });
    if (existingVote) {
      return res.render('video', { error: 'You have already voted for this video.' });
    }

    // Create a new vote record in the database
    await Vote.create({ userId, videoId });

    // Redirect to the video submissions page
    res.redirect('/video');
  } catch (error) {
    console.error('Error submitting vote:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  renderVideoPage,
  handleVideoSubmission,
  handleVideoVoting,
};
