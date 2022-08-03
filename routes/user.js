//using express router
const router = require('express').Router();

// /usertest is the endpoint in /api/user endpoint
// req -> from user like username , email , iD etc.
// resp -> send something to the user
router.get('/usertest', (req, res) => {
    res.send('User Test is Successful!');
});

//POST METHOD CHECK
//taking req from client/user -> like username
//body is the body that is being passed to the server
//then print.
//To check we can use POSTMAN or Thunder clinet
router.post('/userposttest', (req, res) => {
    const username = req.body.username;
    res.send(`Your username is ${username}`);
});

//to Export the router for using it.
module.exports = router;
