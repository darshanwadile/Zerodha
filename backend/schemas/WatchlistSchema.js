const {Schema} = require('mongoose');

const WatchlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    stockName: String
})

module.exports = {WatchlistSchema};