const router = require('express').Router();
const userRoutes = require('./userRoutes');
const videoPostRoutes = require('./videoPostRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/videoPosts', videoPostRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
