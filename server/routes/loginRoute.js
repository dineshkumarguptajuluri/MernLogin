const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const User=require('../models/User');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const jwtSecretKey = 'your-secret-key';
router.use(cookieParser());
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());
router.post('/', async (req, res) => {
    console.log("login rote activated");
    const { username,email, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            res.send('User not found');
            return;
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            res.send('Invalid Password');
            return;
        }
        if(user.email!=email)
        return res.send("Invalid Email");
        // Generate a JWT token
        const token = jwt.sign({ userId: user.id }, jwtSecretKey, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports=router;