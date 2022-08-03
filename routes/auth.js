const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');

//User is going to send us username , password and other information -> so POST request
// '/register' is the end point. To check if the API end point is working , use POSTMAN or thunder client
// and send a request and see if you get a response.
router.post('/register', async (req, res) => {
    //This is just a model object and we should send it to our Db
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        //To encrypt Password
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASSWORD_SEC_KEY,
        ).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    //To send it to our db we can use save()
    try {
        //findOne because there is only 1 user with same username
        const searchUser = await User.findOne({ username: req.body.username });
        //if you find the "searchUser" then return their db ONLY WHEN PASSWORD IS RIGHT!
        //The password will be hashed. So we need to DECRYPT IT!

        !searchUser && res.status(401).json('Wrong Credentials!');
        //if there is no SearchUser then return 401 Error with above message

        const hashedPasswordfound = CryptoJS.AES.decrypt(
            searchUser.password,
            process.env.PASSWORD_SEC_KEY,
        );

        const OriginalPassword = hashedPasswordfound.toString(
            CryptoJS.enc.Utf8,
        );
        const InputPassword = req.body.password;
        // If the password that was found IS NOT SAME AS THE password mapped to the given username
        // then just return 401 error
        OriginalPassword !== InputPassword && res.status(201).json(searchUser);

        // If its correct, then return the user!
        res.status(200).json(searchUser);
    } catch (err) {
        res.status(500).json(err);
        //500 status code for error
    }
});

module.exports = router;
