const router = require('express').Router();
const { VideoPost, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newVideoPost = await VideoPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newVideoPost);
  } catch (err) {
    console.log(err); // Add this line
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const VideoPostData = await VideoPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!VideoPostData) {
      res.status(404).json({ message: 'No VideoPost found with this id!' });
      return;
    }

    res.status(200).json(VideoPostData);
  } catch (err) {
    console.log(err); // Add this line
    res.status(500).json(err);
  }
});

// router.get('/videoposts/:id', async (req, res) => {
//   try {
//     console.log('Reached the GET /videopost/:id route'); // Add this line

//     const VideoPostData = await VideoPost.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const videoPost = VideoPostData.get({ plain: true });

//     res.render('videoposts', {
//       ...videoPost,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     console.log(err); // Add this line
//     res.status(500).json(err);
//   }
// });

module.exports = router;
