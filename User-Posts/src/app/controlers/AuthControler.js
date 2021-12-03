const User = require('../models/User.js');
const argon2  = require('argon2');
const jwt = require('jsonwebtoken');

class AuthControler{
    //@route /api/auth
    //@decs Check If user is login
    //access public
    async checkUserIsLogin(req, res, next) {
        try{
            const user =await User.findById(req.userId).select('-password');
            if(!user) return res.status(400).json({success: false, message: 'User not found'});
    
            res.json({success: true, user});
        }
        catch(err) {
            console.log(err);
            res.status(500).json({success: false, message:'Internal server error'});
        }
    }


    //[POST] /api/auth/register
    //@desc create register
    //@access public
    async register(req, res) {
        const { username, password } = req.body;
       
        // Simple validation
        if(!username || !password) 
            return res.status(400).json({success: false, message: 'Missing username and/or password'});
        try{
            //Check for existing user
            const user =await User.findOne({ username });

            if(user) 
            return res.status(400).json({ success: false, message: 'User already taken'});

            //All good
            const hashpassword = await argon2.hash(password);
            const newUser = new User({
                username,
                password : hashpassword
            });

            await newUser.save();

            //Return token
            const accessToken = jwt.sign({ userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET);

            res.json({success: true, message: 'User created successfully',accessToken})
        }
        catch(err) {
            console.log(err);
            res.status(500).json({success: false, message:'Internal server error'});
        }
        
    }

    //[POST] /api/auth/login
    //@decs login 
    //@access public
    async login(req , res){
        const { username, password } = req.body;
        if( !username && !password) return res.status(400).json({success: false, message: 'Missing username and/or password'});
        try{
            //Check for existing user
            const user = await User.findOne({ username });
            if(!user) 
            return res.status(400).json({success: false, message: 'Incorrect username and/or password'});

            //User found
            const passwordValid = await argon2.verify(user.password, password);
            if(!passwordValid)
                return res.status(400).json({success: false, message: 'Incorrect username and/or password'})

            //All good
            const accessToken = jwt.sign({ userId: user._id}, process.env.ACCESS_TOKEN_SECRET);
            res.json({success: true, message: 'Login successfully',accessToken});

        }catch(err){
            console.log(err);v
            res.status(500).json({success: false, message : 'Internal server error'});
        }
      
        
    }
}

module.exports = new AuthControler();


