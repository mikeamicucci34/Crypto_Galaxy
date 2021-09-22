const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const multer = require('multer')           
const Aws = require('aws-sdk')                
// require('dotenv').config({ path: '../.env' }) //dpible check correct path
require('dotenv').config() //dpible check correct path
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


// router.post('/',
//     passport.authenticate('jwt', { session: false }),
//     (req, res) => {
//       const { errors, isValid } = validateArtworkCreate(req.body);
  
//       if (!isValid) {
//         return res.status(400).json(errors);
//       }
  
//       const newArtwork = new Artwork({
//         title: req.body.title,
//         // user: req.user.id,
//         description: req.body.description,
//         price: req.body.price
        
//       });
  
//       newArtwork.save().then(artwork => res.json(artwork));
//     }
//   );

  // attempt to post artwork 

const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    }
})

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({ storage: storage, fileFilter: filefilter });
// const upload = multer({ storage: storage });

const s3 = new Aws.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,              
    secretAccessKey:process.env.AWS_ACCESS_KEY_SECRET       
})

router.post('/', upload.single('artworkimage'), (req, res) => {
    console.log(req.file)
    console.log(req.body)

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,      // bucket that we made earlier
        Key: req.file.originalname,               // Name of the image
        Body: req.file.buffer,                    // Body which will contain the image in buffer format
        ACL: "public-read-write",                 // defining the permissions to get the public link
        ContentType: "image/jpeg"                 // Necessary to define the image content-type to view the photo in the browser with the link
    };

    s3.upload(params,(error,data)=>{
        if(error){
            res.status(500).send({"err":error})  // if we get any error while uploading error message will be returned.
        }

            console.log(data)                      // this will give the information about the object in which photo is stored 
     
    const artwork = new Artwork({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            artworkImage: data.Location
        });
        artwork.save()
            .then(result => {
                res.status(200).send({
                    _id: result._id,
                    title: result.title,
                    description: result.description,
                    price: result.price,
                    artworkImage: data.Location,
                })
            })
            .catch(err => {
                res.send({ message: err })
          })
    })
})

router.get('/', (req, res) => {
    try {
        console.log("hello")
        // const artworks = await Artwork.find()
        // const artworks = Artwork.find().then((artworks) => res.send(artworks))
        Artwork.find()
          .then((artworks) => res.send(artworks))
        
        // console.log(artworks)
        // res.send(artworks)
    } catch (err) {
        res.send({ message: err, m:"not working" })
    }
});

module.exports = router

