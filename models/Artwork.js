const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtworkSchema = new Schema({
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
    }
    // img: {
    //     type: Buffer,
    //     required: true
    // }
}, {
    timestamps: true
})

const Artwork = mongoose.model('Artwork', ArtworkSchema);
module.exports = Artwork;