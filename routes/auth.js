const router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

//User is going to send us username , password and other information -> so POST request
// '/register' is the end point. To check if the API end point is working , use POSTMAN or thunder client
// and send a request and see if you get a response.
router.post("/register", async (req, res) => {
    //This is just a model object and we should send it to our Db
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        //To encrypt Password
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SEC_KEY).toString(),
    })

    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    }
})

//LOGIN
router.post("/login", async (req, res) => {
    //To send it to our db we can use save()
    try {
        //findOne because there is only 1 user with same username
        const searchUser = await User.findOne({ username: req.body.username })
        //if you find the "searchUser" then return their db ONLY WHEN PASSWORD IS RIGHT!
        //The password will be hashed. So we need to DECRYPT IT!
        const InputPassword = req.body.password

        !searchUser && res.status(401).json("Wrong Credentials!")
        //if there is no SearchUser then return 401 Error with above message

        //If we reached here, that means, there is a user, then decrypt the hashed password
        //stored in the db for the given username.
        const hashedPasswordfound = CryptoJS.AES.decrypt(
            searchUser.password,
            process.env.PASSWORD_SEC_KEY
        )

        const OriginalPassword = hashedPasswordfound.toString(CryptoJS.enc.Utf8)

        // If the password that was found IS NOT SAME AS THE password mapped to the given username
        // then just return 401 error
        OriginalPassword !== InputPassword && res.status(401).json("Wrong Credentials")

        //Basically we can pass in any property. We are gonna pass in id and idAdmin property inside
        // our token. So, if we try to delete a user, then if id in json webtoken == userid then 
        //user belongs to our client and they can delete/update the user.
        //Also , admin can do that.
        const accessToken = jwt.sign(
            {
                id: searchUser._id,
                isAdmin: searchUser.isAdmin,
            },
            process.env.JWT_SEC_KEY,
            { expiresIn: "3d" }
        )

        // If its correct, then return the user!
        const { password, ...others } = searchUser._doc
        res.status(200).json({ ...others, accessToken })
    } catch (err) {
        res.status(500).json(err)
        //500 status code for error
    }
})

module.exports = router
