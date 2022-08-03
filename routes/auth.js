const router = require('express').Router()
const User = require('../models/User')

//User is going to send us username , password and other information -> so POST request
// '/register' is the end point. To check if the API end point is working , use POSTMAN or thunder client
// and send a request and see if you get a response.
router.post('/register', async (req, res) => {
    //This is just a model object and we should send it to our Db
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })

    //To send it to our db we can use save()
    try {
        //Instead of console logging we are using status check at client side.
        //200 - Successful!
        //201 - Successfully Added
        const savedUser = await newUser.save()
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
        //500 status code for error
    }
})

module.exports = router
