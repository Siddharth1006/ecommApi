const Product = require("../models/Product")
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken")

const router = require("express").Router()

//CREATE

router.post("/", async (req, res) => {
    const newProduct = new Product(req.body)

    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        )
        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted...")
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET PRODUCT
// All users and admin can access product
router.get("/find/:id", async (req, res) => {
    try {
        const product = await User.findById(req.params.id)
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL USER
router.get("/", async (req, res) => {
    //We can fetch products by their created date.
    const qNew = req.query.new;
    //OR
    //We can fetch products by their category
    const qCategory = req.query.category;  // Categories query
    try {
        let products;
        if(qNew) {
            products = await Product.find().sort({created : -1}).limit(5);
        }
        else if(qCategory){
            //if categories query is inside the Product.js array, we are gonna just 
            //fetch those products.
            //how to do?
            products = await Product.find({ categories });
        }


        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
})

// //GET USER STATS

// router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
//     const date = new Date()
//     const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

//     try {
//         const data = await User.aggregate([
//             { $match: { createdAt: { $gte: lastYear } } },
//             {
//                 $project: {
//                     month: { $month: "$createdAt" },
//                 },
//             },
//             {
//                 $group: {
//                     _id: "$month",
//                     total: { $sum: 1 },
//                 },
//             },
//         ])
//         res.status(200).json(data)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

module.exports = router
