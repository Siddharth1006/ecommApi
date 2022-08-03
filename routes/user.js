//using express router
const router = require("express").Router();

// /usertest is the endpoint in /api/user endpoint
// req -> from user like username , email , iD etc.
// resp -> send something to the user
router.get("/usertest" , (req , res) => {
    res.send("User Test is Successful!");
});

//If we go to url : localhost:5000/user/usertest , it should show above console log
//if everything went right.

//to Export the router for using it.
module.exports = router