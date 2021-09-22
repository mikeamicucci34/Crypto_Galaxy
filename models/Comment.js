const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    artwork: {
        type: Schema.Types.ObjectId,
        ref: 'Artwork',
        required: true
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }

},  {
    timestamps: true
})

module.exports = Comment = mongoose.model('comment', CommentSchema)