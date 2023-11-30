const { User } = require('../models');

// Render the login page
const renderLoginPage = (req, res) => {
  res.render('login');
};

// Handle user login
const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { username } });

    if (!user || user.password !== password) {
      return res.render('login', { error: 'Invalid username or password.' });
    }

    // Set user session
    req.session.userId = user.id;

    // Redirect to the home page or dashboard
    res.redirect('/');
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Render the signup page
const renderSignupPage = (req, res) => {
  res.render('signup');
};

// Handle user signup
const handleSignup = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.render('signup', { error: 'Username already taken' });
    }

    // Create a new user
    await User.create({ username, password });

    // Redirect to login page or home page
    res.redirect('/login');
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Handle user logout
const handleLogout = (req, res) => {
  // Destroy the user session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).send('Internal Server Error');
    }

    // Redirect to the home page or login page
    res.redirect('/');
  });
};

module.exports = {
  renderLoginPage,
  handleLogin,
  renderSignupPage,
  handleSignup,
  handleLogout,
};
