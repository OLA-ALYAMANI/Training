// The middleman الوسيط
const express = require("express")
// المخزن
const mongoose = require("mongoose")
const POST = 5000
// الواجهة الاساسية (ejs)

const expressLayouts = require("express-ejs-layouts")

// for Time and date
const moment = require("moment")


const methodOverride = require('method-override')

// model
const Article = require('./models/Article')

const app = express()

// The middleman الوسيط
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

//look for static files here(CSS, JS, Image, video, audio)
app.use(express.static("public"))

//gets form data
// يحصل على بيانات النموذج
app.use(express.urlencoded({extended:true}))

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
    "mongodb://localhost/articles",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () =>{
      // (err) => {
    //     if(err){
    //         console.log(err)
    //     }
      console.log("mongodb connected!")
    }
)

//http://google.com - GET
app.get("/", (req, res) => {
  //   res.send("This is the Home route")
    // console.log("here")
    Article.find().then(articles => {
      //   console.log(articles);

      //{ articles: articles } \\ { articles }

      //{ moment: moment } \\ { moment }

      res.render("articles/index", { articles, moment });
    })
    .catch(err => {
      console.log(err);
    });
    // res.render("articles/index")
});

// create article routes
app.get("/create", (req, res) =>{
    //   res.send("This is the Home route")
    res.render("articles/create")
  })

app.post("/create", (req, res) =>{
    // res.send("This is the Home route")
    // res.render("articles/create")
    // استقبال المعلومات الموجودة في الصفحة الثاني
    console.log(req.body)
    let article = new Article(req.body)
    //   console.log(article);
    article
    .save()
    .then(() => {
        // res.send("Post work!!")
        res.redirect("/")
    })
    .catch(err =>{
        console.log(err)
        res.send("Error!!")
    })
    // ارسل هذه الرسالة في الصفحة
//     res.send("Post work!!")
})

//   I do not have this file (another.ejs)
//   app.get("/a", (req, res) =>{
//  //res.send("This is the Home route")
//     res.render("another")
//   })

// لا ارسل شيء فقط استقبل
// http://localhost:5000/atricle/pramas
app.get("/article/:id", (req,res) => {
    // console.log(req.params.id)
    Article.findById(req.params.id).then(article => {
        // لن يظهر لانه غير موجود
        // console.log(article)
        res.render("articles/show", {article, moment})
    })
})

app.delete("/article/:id/delete", (req,res) => {
    console.log(req.params.id)
    Article.findByIdAndDelete(req.params.id).then(article => {
        // لن يظهر لانه غير موجود
        // console.log(article)
        res.redirect("/")
    })
})

app.listen(POST, () => console.log(`running on ${POST}`))