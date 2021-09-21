const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtworkSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: false
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