const express = require('express');
const router = express.Router();

const challengeModel = require('./challenge.js');
const userModel = require('./user.js');
const videoModel = require('./video.js');
const voteModel = require('./vote.js');

router.use('/challenge', challengeModel);
router.use('/user', userModel);
router.use('/video', videoModel);
router.use('/vote', voteModel);

module.exports = router;