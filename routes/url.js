const express = require('express');
const router = express.Router();
const {generateShortUrl,generateanalytics} = require ('../controller/url');

router.post('/', generateShortUrl);
router.get('/analytics/:shortid', generateanalytics);
module.exports = router;