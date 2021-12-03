const express = require('express');
const router = express.Router();
const authControler = require('../app/controlers/AuthControler.js');
const verifyToken = require('../app/middlewares/auth');


router.post('/register', authControler.register);
router.post('/login', authControler.login);
router.get('/', verifyToken, authControler.checkUserIsLogin)



module.exports = router;