const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validateArtworkCreate = require('../../validation/artwork_create');
const Artwork = require('../../models/Artwork'); 



router.get("/", (req, res) => {
  Artwork.find()
    .sort({ date: -1 })
    .then((artworks) => res.json(artworks))
    .catch((err) => res.status(404).json({ noartworkfound: "No tweets found" }));
});

router.get("/user/:user_id", (req, res) => {
  Artwork.find({ user: req.params.user_id })
    .then((artworks) => res.json(artworks))
    .catch((err) =>
      res.status(404).json({ noartworkfound: "No tweets found from that user" })
    );
});

router.get("/:id", (req, res) => {
  Artwork.findById(req.params.id)
    .then((artwork) => res.json(artwork))
    .catch((err) =>
      res.status(404).json({ noartworkfound: "No tweet found with that ID" })
    );
});

router.delete("/:id", (req, res) => {
  Artwork.deleteOne({ _id: req.params.id }).then((artwork) => res.json(artwork)).catch((err) => res.status(404).json({deleteerror: "No nft found"}))
})


router.patch("/:id", (req, res) => {
  Artwork.findOne({ id: req.body.id }, (err, artwork) => {
    if (err) {
      return res.status(400).json(err)
    } else {
      artwork.update({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
      }, (err, docs) => {
        if (err) {
          return res.status(400).json(err);
        } else {
          return res.json({
            title: artwork.title,
            description: artwork.description,
            price: artwork.price
          })
        }
      });
    }
  })
})


router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateArtworkCreate(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const newArtwork = new Artwork({
        title: req.body.title,
        // user: req.user.id,
        description: req.body.description,
        price: req.body.price
        
      });
  
      newArtwork.save().then(artwork => res.json(artwork));
    }
);
  

module.exports = router