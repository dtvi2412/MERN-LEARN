const express = require('express');
const router = express.Router();
const AuthRouter = require('./auth.js');
const PostRouter = require('./post.js');

router.use('/auth', AuthRouter);
router.use('/post', PostRouter);

module.exports = router;