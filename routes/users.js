const userController = require('../controllers/users_controller');

const express=require('express');

const router = express.Router();


router.get('/homepage',userController.Homepage)

router.post('/shorten',userController.urlshortener)
router.get('/:shortUrl',userController.redirectOriginal)

router.get('/homepage/data', userController.getdata);
module.exports=router;