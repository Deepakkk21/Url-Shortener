const authController=require("../controllers/auth_controller");
const express=require('express');
const router = express.Router();


router.get('/' , userController.Homepage) 
router.use('/user', require('./users'));
router.use('/auth', require('./auth'));

module.exports=router;
