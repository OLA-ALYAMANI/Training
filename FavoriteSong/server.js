// 1
const express = require("express")
// 2
const mongoose = require("mongoose")
// 3
const POST = 3000
// 8 To connect the layout page with other
const expressLayouts = require("express-ejs-layouts")

// 13 call for model
const MDOfSong = require('./model/FavSong')

// 4
const app = express()

// 9 اخبر view انه في كل مرة اقوم بإستدعاء اذهبي الى صفحة (layouts)
app.use(expressLayouts)

// 7
app.set("view engine", "ejs")

// 12
app.use(express.urlencoded({extended:true}))

// connet to mongoose
// 6
mongoose.connect(
    "mongodb://localhost/Songs", 
    {
        useNewUrlParser: true, useUnifiedTopology: true
    },
    () => {
        console.log("Has connected")
    }
)

app.get("/", (req, res) => {
    // فقط لمعرفة انه يعمل بشكل صحيح
    // res.send("This is Song page")
    // 14
    MDOfSong.find()
    .then(Songs => {
        // {Songs, Songs} the value and the key have the same name
        res.render("Songs/index", {Songs})//we change from send to render so I can go the the other page
    })
    .catch(err => {
        console.log(err)
    })
})

// 10
app.get("/addSong", (req,res) =>{
    res.render("Songs/addSong")
})

// 11
app.post("/addSong", (req,res) => {
    var nwmosong = new MDOfSong(req.body)
    nwmosong.save()
    .then(() =>{
        res.redirect("/")
    })
    .catch(err => {
        console.log(err)
        res.send("There an error, check agen")
    })
})
// 5
app.listen(POST, () => {
    console.log(`It run in ${POST}`)
})

// npm i mongoose express (it for express)
// npm i express-ejs-layouts ejs (for the ejs)