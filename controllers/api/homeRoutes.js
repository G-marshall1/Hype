const router = require('express').Router();
const { VideoPost, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all VideoPosts and JOIN with user data
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
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/videoPost/:id', async (req, res) => {
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
    console.log(err)
    res.status(500).json(err);
  }
});

module.exports = router;
