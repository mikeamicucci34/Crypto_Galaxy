const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Comment = require('../../models/Comment')
const ValidateComment = require('../../validation/comments')



router.get('/artwork/:artworkId', (req, res) => {
    Comment.find({artwork: req.params.artworkId})
    .sort({date: -1})
    .then(comments => res.json(comments))
    .catch(err => 
        err.status(404).json({noCommentsFound: 'This artwork does not have any comments yet'})
    )

})


router.post('/',
    (req, res) => {

        const { errors, isValid } = ValidateComment(req.body);
        
        if (!isValid) {
          return res.status(400).json(errors);
        }


        const newComment = new Comment({
            body: req.body.body,
            user: req.user.id,
            artwork: req.artwork.id
        })

        newComment.save().then(comment => res.json(comment))
    }
)