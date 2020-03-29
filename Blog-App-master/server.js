const express = require("express");
const mongoose = require("mongoose");
const PORT = 4000;

//---initial express
const app = express();

// Importing routes
const articlesRoute = require('./routes/articles');
const authorsRoute = require('./routes/authors');

// Use Routes
app.use(articlesRoute);
app.use(authorsRoute);

//look for static files here(CSS, JS, Image, video, audio)
app.use(express.static("public"));


/* will tell nodejs to look in a folder
 called views for all ejs files */
app.set("view engine", "ejs");


//--mongodb connection
mongoose.connect(
  "mongodb://localhost/blogAppRef",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("mongodb connected!");
  }
);


app.listen(PORT, () => console.log(`running on ${PORT}`));