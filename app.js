const express = require("express");
const app = express();
const db = require('./config/keys_dev').mongoURI;
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const passport = require('passport');

const users = require("./routes/api/users");
const artworks = require('./routes/api/artwork');
// const tweets = require("./routes/api/tweets");
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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

