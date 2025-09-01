const {Schema} = require('mongoose');

const FundsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fundsAvilable: Number
})

module.exports = {FundsSchema};