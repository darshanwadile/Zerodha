const { Schema } = require('mongoose');

const OrdersSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderType: String,
    stockName: String,
    AveragePrice: Number,
    qty: Number
})

module.exports = { OrdersSchema };