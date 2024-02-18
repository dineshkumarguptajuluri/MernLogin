const express=require('express');
const routes=express.Router();
const User=require('../models/User');
const cookieParser = require('cookie-parser');
routes.use(express.json());

// Middleware to parse URL-encoded bodies
routes.use(express.urlencoded({ extended: true }));
routes.use(cookieParser());


routes.post('/', async (req, res) => {
    console.log("signup route activated")
    const { username, email, password } = req.body;
    try {
        const newUser = new User({
            username,
            email,
            password
        });
        await newUser.save();
        console.log('New User Created');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports=routes;