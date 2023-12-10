const router = require('express').Router();
const userRoutes = require('./userRoutes');
const videoPostRoutes = require('./videoPostRoutes');
const commentRoutes = require('./commentRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/users', userRoutes);
router.use('/videoPosts', videoPostRoutes);
router.use('/comments', commentRoutes);
router.use('/', homeRoutes);

module.exports = router;
