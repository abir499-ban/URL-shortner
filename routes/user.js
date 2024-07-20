const express = require('express');
const router = express.Router();
const {createUser,handleuserLogin} = require('../controller/user');

router.post('/signup', createUser);
router.post('/login', handleuserLogin);
module.exports = router;
