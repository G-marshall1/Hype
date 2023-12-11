const router = require('express').Router();
const userRoutes = require('./userRoutes');
const videoPostRoutes = require('./videoPostRoutes');
const commentRoutes = require('./commentRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/users', userRoutes);
router.use('/videoPost', videoPostRoutes); // Removed the 's' to match the path in videoPostRoutes
router.use('/comments', commentRoutes);
router.use('/homepage', homeRoutes);

module.exports = router;
