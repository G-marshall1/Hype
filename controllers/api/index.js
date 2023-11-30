const router = require('express').Router();
const challengeRoutes = require('./challengeRoutes');
const userRoutes = require('./userRoutes');
const videoRoutes = require('./videoRoutes');

router.use('/challenge', challengeRoutes);
router.use('/user', userRoutes);
router.use('/video',videoRoutes);

module.exports = router;


