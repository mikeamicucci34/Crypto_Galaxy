const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validateArtworkCreate = require('../../validation/artwork_create');
const Artwork = require('../../models/Artwork'); 


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