const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Comment = require('../../models/Comment')
const ValidateComment = require('../../validation/comments')



router.get('/artworks/:artworkId', (req, res) => {
    
    Comment.find({artwork: req.params.artworkId})
    .sort({date: -1})
    .then(comments => res.json(comments) )
    .catch(err => 
        res.status(404).json({noCommentsFound: 'This artwork does not have any comments yet'})
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
            user: req.body.user,
            artwork: req.body.artwork
        })

        newComment.save().then(comment => res.json(comment))
    }
)

router.delete('/:id', (req, res) => {

 Comment.deleteOne({_id: req.params.id}).then(artwork => res.json(artwork))
 .catch(err => res.status(404).json({deleteError: 'No comment found'}))
})

router.patch('/:id', (req, res) => {
   
    Comment.findOne({ _id: req.body._id}, (err, comment) => {
        
        if (err) {
            return res.status(400).json(err)
        } else {
            comment.updateOne({
                body: req.body.body
            }, (err, docs) => {
                if (err) {
                    return res.status(400).jason(err)
                } else {
                    return res.json({
                        body: comment.body
                    })
                }
            })
        }
    })
})

module.exports = router