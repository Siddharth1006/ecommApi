const router = require("express").Router();

router.get("/usertest" , (req , res) => {
    res.send("User Test is successful!");
});

module.exports = router