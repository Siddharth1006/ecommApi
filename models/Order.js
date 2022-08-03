const mongoose = require('mongoose')

//Every user has one cart
const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [
        {
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
    amount: { type: Number, required: true },
    //After payment, the Stripe library should return an object
    //Also address will contain multiple lines like - Line 1 , Line 2 , Landmark , City , State etc. So an object will be returned.
    address: { type: Object, required: true },
    status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Order', OrderSchema)
