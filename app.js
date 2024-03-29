const express = require("express");
const app = express();
const db = require('./config/keys_dev').mongoURI;
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const passport = require('passport');
//newupdate
const users = require("./routes/api/users");
const likes = require("./routes/api/likes");
const artworks = require("./routes/api/artworks");

const comments = require('./routes/api/comments')

const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './frontend/env' }) //dpible check correct path

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));


app.use(passport.initialize());
require('./config/passport')(passport);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", users);
app.use("/api/artworks", artworks);

app.use("/api/likes", likes);
app.use('/api/comments', comments)


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

