const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const Like = require('../../models/Like');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys_dev');
const passport = require('passport');
const ValidateLike = require('../../validation/likes')

router.get('/:id', (req, res) => {
    Like.findById(req.params.id)
        .then(user => {
            res.json(user)
        })
        .catch(err => res.status(404).json({ nouserfound: 'No likes found with that ID' }))
})

// router.get('/', (req, res) => {
//     Like.findById(req.params.id)
//         .then(user => {
//             res.json(user)
//         })
//         .catch(err => res.status(404).json({ nouserfound: 'No likes found with that ID' }))
// })

router.post('/', (req, res) => {
    const newLike = new Like({
        artworkId: req.body.artworkId,
        userId: req.body.userId
    })
    newLike.save().then(like => res.json(like))
}
)

router.delete("/", (req, res) => {
    Like.deleteOne({ artworkId: req.body.artworkId, userId: req.body.userId }).then(like => res.json(like))
        .catch(err => res.status(404).json({ deleteError: 'No like found' }))

})

router.get("/", (req, res) => {
    Like.find()
        .then((likes) => res.json(likes))
});

module.exports = router;