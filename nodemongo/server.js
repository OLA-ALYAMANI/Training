// The middleman الوسيط
const express = require("express")
// المخزن
const mongoose = require("mongoose")
const POST = 3000
// الواجهة الاساسية (ejs)

const app = express()
const expressLayouts = require("express-ejs-layouts")

//GET - retrieve data
//POST - send data
//PUT/PATCH - updates
//DELETE - removes


// Import routes
const articlesRoute = require('./routes/articles')
const authorsRoute = require('./routes/authors')

// use routes
app.use(articlesRoute)
app.use(authorsRoute)


//look for static files here(CSS, JS, Image, video, audio)
app.use(express.static("public"))


// look in views folder for a file named
// layout.ejs
app.use(expressLayouts)


/* will tell nodejs to look in a folder
 called views for all ejs files */
// tell the app all ejs file is in this folder (view) كل ملفات (ejs) داخل ملف (view)
app.set("view engine", "ejs")

// mongodb connection
mongoose.connect(
    //localhost اذهب الى الملف الذي باسم (articles) وخذ منه الملفات والمعلومات التي تريدها
    "mongodb://localhost/blogAPPrRef",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () =>{
      console.log("mongodb connected!");
    }
  );

app.listen(POST, () => console.log(`running on ${POST}`))