const router = require('express').Router();
const { User, VideoPost } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const UserData = await User.findAll({
        include: [
          {
            model: VideoPost, // Include the VideoPost model
            attributes: ['title', 'content'], // Specify the attributes you want from VideoPost
          },
        ],
      });
      

    const user = UserData.map((User) => User.get({ plain: true }));

    res.render('login', {
      user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.error('Error in / route:', err);
    res.status(500).render('error', { error: err });
  }
});

router.get('/homepage', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: VideoPost }],
    });

    const user = userData.get({ plain: true });
    console.log(user);

    res.render('homepage', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.error('Error in /homepage route:', err);
    res.status(500).render('error', { error: err });
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: VideoPost }],
    });

    const user = userData.get({ plain: true });
    console.log(user);

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.error('Error in /homepage route:', err);
    res.status(500).render('error', { error: err });
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }

  try {
    res.render('login');
  } catch (err) {
    console.error('Error in /login route:', err);
    res.status(500).render('error', { error: err });
  }
});

module.exports = router;
