const authController=require("../controllers/auth_controller");
const express = require('express');
const app = express();
const router = express.Router();


router.get('/signup',authController.signupPage); 
router.post('/signup',authController.signup);

router.get('/signIn',authController.signInPage); 
router.post('/signIn',authController.signIn); 

router.get('/forgotPassword',authController.forgotpasswordpage);
router.post('/forgotPassword',authController.forgotPassword);

router.get('/resetPassword/:resetToken', authController.resetPasswordPage);
router.post('/resetPassword/:resetToken', authController.resetPassword);

router.post('/logout', authController.logout);


module.exports = router;