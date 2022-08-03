const router = require('express').Router()
const User = require('../models/User')

//User is going to send us username , password and other information -> so POST request
// '/register' is the end point. To check if the API end point is working , use POSTMAN or thunder client
// and send a request and see if you get a response.
router.post('/register', (req, res) => {
    //This is just a model object and we should send it to our Db
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
    })

    //To send it to our db we can use save()
    const savedUser = newUser.save()
    //But there's a problem. Since its a promise - Async function.
    //if we try to send a document/update or delete or do any other things in our db
    //it takes a couple of milliseconds to perform the action. Depends on server connection speed(iNternet speed)

    //So to know whether the action has been perform, we need to console.log
    console.log(savedUser)
    //But when we try to console.log() , the savedUser process may not have finished depending on
    // the internet connection, but console.log() will be immediate. So what to do?

    // WE USE ASYNC AWAIT!
})

module.exports = router
