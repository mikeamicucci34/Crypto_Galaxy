const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    artworkId: { 
        type: mongoose.Schema.Types.ObjectId, ref: "Artwork", required: true 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
    }
}, {
    timestamps: true
})

const Like = mongoose.model('Like', LikeSchema);
module.exports = Like;