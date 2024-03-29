const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtworkSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    artworkImage: { 
        type: String,
        // required: true
    },
    comments: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    date: {
        type: Date
    }
}, {
    timestamps: true
})

const Artwork = mongoose.model('Artwork', ArtworkSchema);
module.exports = Artwork;