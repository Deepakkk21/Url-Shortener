const express=require('express');
const router = express.Router();

const userController = require('../controllers/users_controller')

router.get('/' , userController.Homepage) 
router.use('/user', require('./users'));
router.use('/auth', require('./auth'));

module.exports=router;
