const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        //verify function
        //If verified you have 2 options:
        /*
        a) Returns an error 
        b) Returns a user response;
        */
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SEC_KEY, (err, user) => {
            if (err) {
                res.status(403).json("WRONG Token!")
            }
            req.user = user // just like req.body , req.header etc.
            next() // leaves this function and goes to root in user.js => router.put()
        })
    } else {
        return res.status(401).json("You are NOT AUTHENTICATED!")
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next() //continue with root function
        } else {
            res.status(403).json("You are not allowed to do that!")
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("You are not alowed to do that!")
        }
    })
}

module.exports = {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyToken,
}
