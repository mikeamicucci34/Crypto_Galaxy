const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const multer = require('multer')           
const Aws = require('aws-sdk')
const multerS3 = require('multer-s3')
// const fs = require('fs');
// const fileType = require('file-type');
// const multiparty = require('multiparty');                
// require('dotenv').config({ path: '../.env' }) //dpible check correct path
require('dotenv').config() //dpible check correct path
const validateArtworkCreate = require('../../validation/artwork_create');
const Artwork = require('../../models/Artwork'); 


router.get("/", (req, res) => {
  Artwork.find()
    .sort({ date: -1 })
    .then((artworks) => res.json(artworks))
    .catch((err) => res.status(404).json({ noartworkfound: "No artwork found" }));
});


router.get('/user/:userId', (req, res)=> {
  Artwork.find({user: req.params.userId})
  .sort({date: -1})
  .then(artworks => res.json(artworks))
  .catch(err=> res.status(404).json({noArtsFound: 'This user did not share any arts yet'}))
})

// router.get("/user/:userId", (req, res) => {
//   Artwork.find({ user: req.params.userId })
//     .then((artworks) => res.json(artworks))
//     .catch((err) =>
//       res.status(404).json({ noartworkfound: "No artworks found from that user" })
//     );
// });

router.get("/:id", (req, res) => {
  Artwork.findById(req.params.id)
    .then((artwork) => res.json(artwork))
    .catch((err) =>
      res.status(404).json({ noartworkfound: "No artwork found with that ID" })
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


//aws upload

const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    }
})

const filefilter = (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];
    // if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
    if (allowedMimes.includes(file.mimetype)) {

        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({ storage: storage, fileFilter: filefilter });

// attempt using s3 multer package

const s3 = new Aws.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,              
    secretAccessKey:process.env.AWS_ACCESS_KEY_SECRET       
})


router.post('/', upload.single('artworkImage'), (req, res) => {
    console.log(req.file)

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,     
        Key: req.body.title,               
        Body: req.file.buffer,                    
        ACL: "public-read-write",                 
        ContentType: "image/jpeg"                 
    };

    s3.upload(params,(error,data)=>{
        if(error){
            res.status(500).json(error); 
        }

        debugger; 
    const artwork = new Artwork({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            artworkImage: data.Location,
            user: req.body.user
        });
        artwork.save()
            .then(result => {
                res.status(200).send({
                    _id: result._id,
                    title: result.title,
                    description: result.description,
                    price: result.price,
                    artworkImage: data.Location,
                    user: result.user
                })
            })
            .catch(err => {
                res.json(err); 
          })
    })
})

module.exports = router

