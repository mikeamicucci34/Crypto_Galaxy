const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtworkSchema = new Schema({
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'users'
    // },
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
    }
}, {
    timestamps: true
})

const Artwork = mongoose.model('Artwork', ArtworkSchema);
module.exports = Artwork;