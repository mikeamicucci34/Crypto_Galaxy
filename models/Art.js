const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', UserSchema);
module.exports = User;
