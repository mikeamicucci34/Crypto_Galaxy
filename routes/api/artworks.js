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

router.get("/user/:user_id", (req, res) => {
  Artwork.find({ user: req.params.user_id })
    .then((artworks) => res.json(artworks))
    .catch((err) =>
      res.status(404).json({ noartworkfound: "No artworks found from that user" })
    );
});

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

// const multerMemoryStorage = multer.memoryStorage();
// const multerUploadInMemory = multer({
//     storage: multerMemoryStorage
// });

// router.post('/',multerUploadInMemory.single("artworkImage"),async(req, res)=>{
//     debugger;
//     try{

//         if(!req.file || !req.file.buffer){
//             throw new Error("File or buffer not found");
//         }

//         const uploadResult = await S3.upload({
//                     Bucket: process.env.AWS_BUCKET_NAME,     
//                     Key: req.file.originalname,   
//                     // Key: "WhateverKeynameYouWantToGive",
//                     Body: req.file.buffer,
//                     ACL: 'public-read'
//                 }).promise();

//         console.log(`Upload Successful!`);

//         res.send({
//             message: "file uploaded"
//         })



//     }catch(e){
//         console.error(`ERROR: ${e.message}`);

//         res.status(500).send({
//             message: e.message
//         })
//     }

// });


//aws upload

const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        // debugger;
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

// attempt using s3 multer package

const s3 = new Aws.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,              
    secretAccessKey:process.env.AWS_ACCESS_KEY_SECRET       
})

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_BUCKET_NAME,
//     metadata: function (req, file, cb) {
//       cb(null, {fieldName: file.fieldname});
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString())
//     },
//     ACL: "public-read-write",
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//   })
// })



router.post('/', upload.single('artworkImage'), (req, res) => {
    // debugger;
    console.log(req.file)

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,      // bucket that we made earlier
        Key: req.body.title,               // Name of the image
        Body: req.file.buffer,                    // Body which will contain the image in buffer format
        ACL: "public-read-write",                 // defining the permissions to get the public link
        ContentType: "image/jpeg"                 // Necessary to define the image content-type to view the photo in the browser with the link
    };

    s3.upload(params,(error,data)=>{
    // s3.upload((error,data)=>{
        if(error){
            res.status(500).send({"err":error})  // if we get any error while uploading error message will be returned.
        }

            // console.log(data)                      // this will give the information about the object in which photo is stored 
    //  debugger;
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

module.exports = router

