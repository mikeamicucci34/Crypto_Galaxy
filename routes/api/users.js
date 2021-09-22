const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys_dev');
const passport = require('passport');
const multer = require('multer')           
const Aws = require('aws-sdk')
const multerS3 = require('multer-s3')
require('dotenv').config()

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        handle: req.user.handle,
        email: req.user.email
    });
})

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));



router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Check to make sure nobody has already registered with a duplicate email
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                // Throw a 400 error if the email address already exists
                return res.status(400).json({ email: "A user has already registered with this address" })
            } else {
                // Otherwise create a new user
                const newUser = new User({
                    handle: req.body.handle,
                    email: req.body.email,
                    password: req.body.password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
})


router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            res.json(user)
        })
        .catch(err => res.status(404).json({ nouserfound: 'No user found with that ID' }))
})

router.get("/", (req, res) => {
    User.all()
        .sort({ date: -1 })
        .then(offers => res.json(offers))
        .catch(err => res.status(404).json({ nooffersfound: "No offers found" }));
});

router.patch("/:id", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).json(err);
        } else {
            user.update({ bio: req.body.bio }, (err, docs) => {
                if (err) {
                    return res.status(400).json(err);
                } else {
                    return res.json({
                        id: user.id,
                        handle: user.handle,
                        email: user.email,
                        bio: user.bio,
                    });
                }
            });
        }
    });
});


router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    console.log(errors);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ email: 'This user does not exist' });
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { id: user.id, name: user.name };

                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            // Tell the key to expire in one hour
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            });
                    } else {
                        return res.status(400).json({ password: 'Incorrect password' });
                    }
                })
        })
})

// aws for user pro pic upload

// const storage = multer.memoryStorage({
//     destination: function (req, file, cb) {
//         cb(null, '')
//     }
// })

// const filefilter = (req, file, cb) => {
//     const allowedMimes = [
//       'image/jpeg',
//       'image/pjpeg',
//       'image/png',
//       'image/gif',
//     ];
//     // if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
//     if (allowedMimes.includes(file.mimetype)) {

//         cb(null, true)
//     } else {
//         cb(null, false)
//     }
// }

// const upload = multer({ storage: storage, fileFilter: filefilter });

// const s3 = new Aws.S3({
//     accessKeyId:process.env.AWS_ACCESS_KEY_ID,              
//     secretAccessKey:process.env.AWS_ACCESS_KEY_SECRET       
// })

// router.post('/', upload.single('userImage'), (req, res) => {

//     const params = {
//         Bucket: process.env.AWS_BUCKET_NAME,     
//         Key: req.body.title,               
//         Body: req.file.buffer,                    
//         ACL: "public-read-write",                 
//         ContentType: "image/jpeg"                 
//     };

//     s3.upload(params,(error,data)=>{
//         if(error){
//             res.status(500).json(err); 
//         }


//     const artwork = new Artwork({
//             title: req.body.title,
//             description: req.body.description,
//             price: req.body.price,
//             artworkImage: data.Location,
//             user: req.body.user
//         });
//         artwork.save()
//             .then(result => {
//                 res.status(200).send({
//                     _id: result._id,
//                     title: result.title,
//                     description: result.description,
//                     price: result.price,
//                     artworkImage: data.Location,
//                     user: result.user
//                 })
//             })
//             .catch(err => {
//                 res.json(err); 
//           })
//     })
// })


module.exports = router;