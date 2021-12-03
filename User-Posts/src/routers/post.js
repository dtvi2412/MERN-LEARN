const express = require('express');
const router = express.Router();
const postControler = require('../app/controlers/PostControler');
const verifyToken = require('../app/middlewares/auth');

router.get('/', verifyToken, postControler.getPostOfUser);
router.post('/', verifyToken, postControler.createPost);
router.put('/:id', verifyToken, postControler.updatePostOfUser);
router.delete('/:id', verifyToken ,postControler.deletePost);

module.exports = router;