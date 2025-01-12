const User = require('../modals/user');
const generateToken = require('../authentication');
const sendEmail= require('../mailer')
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes, Op } = require('sequelize');


// signup controller
module.exports.signupPage = function(req,res){
    return res.render("Sign_up")
}

module.exports.signup = async function(req,res){
    console.log(req.body);
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var confirm_password = req.body.confirm_password;

    if(password!==confirm_password){
        // alert user password dont match
               console.log("password don't match")
               return res.redirect('back');
    }else{
        var user= await User.findOne({ where: { email: { [Op.iLike]: email } } });
        if(user){
            // alert user email exists
            console.log("email already exits");
            return res.redirect('/auth/signIn')
        }else{
           var user=await User.create({name:name,email:email,password:password});
           console.log(user);
           return res.redirect('/auth/signIn')
        }
    }
}


// SignIn controller

module.exports.signInPage = function(req,res){
    return res.render("Sign_in")
}

module.exports.signIn = async function(req,res){
    console.log(req.body);
    var email=req.body.email;
    var password=req.body.password;
    var user=await User.findOne({ where: { email: { [Op.iLike]: email } } });
    if(user){
        console.log(user);
        if(user.password===password){

            const token = generateToken(user.id);
            res.cookie('token', token, { httpOnly: true });

            console.log("welcome to profile page");
            await user.save();

            return res.redirect("/user/homepage");
        }else{
            // alert the user about wrong password
            console.log("Wrong passord");
        return res.redirect("back")
        }
    }else{
            // alert the user that email doesnot exist ,please Signup
           console.log("email doesnot exits");
            return res.redirect("/auth/signup")
        }
    }


    // forgot password feature

    module.exports.forgotpasswordpage = async function (req, res){
        res.render('forgot_password');
    };

    module.exports.forgotPassword = async function (req, res) {
        const email = req.body.email;
        const user = await User.findOne({ email: email });
    
        if (user) {
            // Generate a reset token
            const resetToken = generateToken(user.id);
            user.resetToken = resetToken;
    
            user.resetTokenExpiry = Date.now() + 300000; // 5 min in milliseconds
            await user.save();
    
            // Send the reset email
            // const resetLink = `http://localhost:8000/auth/resetPassword/${resetToken}`;
            const resetLink = `https://url-shortener-w8ea.onrender.com/auth/resetPassword/${resetToken}`;
            const emailBody = `Click on the following link to reset your password: ${resetLink}`;
            await sendEmail(user.email, 'Password Reset', emailBody);
    
            console.log('Reset email sent successfully');
            return res.redirect('/auth/signIn');
        } else {
            console.log('User not found');
            return res.redirect('/auth/signup');
        }
    };

// Reset Password feature


module.exports.resetPasswordPage = function (req, res) {
    const resetToken = req.params.resetToken;
    res.render('update_password',{ resetToken });
};


module.exports.resetPassword = async function (req, res) {

    const resetToken = req.params.resetToken;
    const newPassword = req.body.newPassword;

    // Find user by reset token and check expiration
    const user = await User.findOne({
        resetToken,
        resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
        // Token is invalid or expired, handle accordingly
        console.log("Invalid or expired reset token");
        return res.redirect('/auth/forgotPassword');
    }

    // Update user's password and reset token fields
    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    // Redirect or respond as needed
    res.redirect('/auth/signIn');
};



// Logout Feature


module.exports.logout = function(req, res){
    res.clearCookie('token'); 
    console.log('logout Sucussfully')

     return res.redirect('/auth/signIn');
};
    
