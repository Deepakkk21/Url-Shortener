const authController=require("../controllers/auth_controller");
const express=require('express');
const router = express.Router();

router.get('/' , authController.signupPage) 

router.use('/user', require('./users'));
router.use('/auth', require('./auth'));

module.exports=router;