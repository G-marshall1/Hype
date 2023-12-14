const router = require('express').Router();
const { VideoPost, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // If the user is already logged in, fetch all VideoPosts and render the homepage
    if (req.session.logged_in) {
      const VideoPostData = await VideoPost.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });

      // Serialize data so the template can read it
      const videoposts = VideoPostData.map((VideoPost) => VideoPost.get({ plain: true }));

      // Pass serialized data and session flag into template
      res.render('homepage', {
        videoposts,
        logged_in: req.session.logged_in,
      });
    } else {
      // If the user is not logged in, render the login page
      res.render('login');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/videopost/:id', async (req, res) => {
  try {
    const VideoPostData = await VideoPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const videoPost = VideoPostData.get({ plain: true });

    res.render('videoPost', {
      ...videoPost,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: VideoPost }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
