const User = require('../models/user');
const jwt = require('jsonwebtoken'); //generate signed token
const expressJwt = require('express-jwt'); //authorization
const {errorHandler} = require('../helpers/dbErrorHandler');



exports.signup = (req,res) => {

    console.log('req.body', req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                err: errorHandler(err)
            });
        }
        user.salt = undefined
        user.hashed_password = undefined
        res.json({
            user
        });
    });
};

exports.signin = (req,res) => {
    //find user based on email
    const {email, password} = req.body
    User.findOne({email}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with this email does not exist'
            });
        }
     if(!user.authenticate(password)) {
         return res.status(401).json ({
             error: 'Email and password do not much'
         });
     }
      // if user is found check if the email and password match
      const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
      res.cookie('t', token, {expire: new Date() + 9999});
      const {_id, name, email, role} = user;
      return res.json({token, user: {_id, email, name, role} });

    });
};

exports.signout = (_req, res) => {
      res.clearCookie('t')
      res.json({ message: 'Signed out' });
};