const express = require('express');
const router = express.Router();

// Home Page
router.get('/', (req, res) => {
  res.render('home');
});

// Login Page
router.get('/login', (req, res) => {
  res.render('login');
});

// Add more routes as needed

module.exports = router;
