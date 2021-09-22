const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
        type: Schema.type.ObjectId,
        ref: 'users'
    },
    artwork: {
        type: Schema.type.ObjectId,
        ref: 'artworks'
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