const express = require("express");
const moment = require("moment");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");

const router = express.Router();

//models
const Article = require("../models/Article");
const Author = require("../models/Author");

// override with POST having ?_method=DELETE
router.use(methodOverride("_method"));
router.use(expressLayouts);
//gets form data
router.use(express.urlencoded({ extended: true }));

//GET - retrieve data
//POST - send data
//PUT/PATCH - updates
//DELETE - removes

//http://google.com - GET
router.get("/", (request, response) => {
    Article.find().populate('author')
      .then(articles => {
        //   console.log(articles);
        //{ articles: articles } \\ { articles }
        //{ moment: moment } \\ { moment }
        response.render("articles/index", { articles, moment });
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  //create article routes
  router.get("/create", (request, response) => {
    // pass authors to create article page for drop down
    Author.find()
    .then(authors => {
      response.render("articles/create", {authors})
    })
    .catch(err => {
      console.log(err);
    });
    // response.render("articles/create");
  });
  
  router.post("/create", (request, response) => {
    console.log(request.body);
    let article = new Article(request.body);

    // Author.findById(request.body.author, (err, author) => {
    //   author.article.push(article);
    //   author.save();
    //   response.redirect("/authors");
    // })
  
    //   console.log(article);
    //save article
    article
      .save()
      .then(() => {
        //   response.send("Post worked!!");
        response.redirect("/");
      })
      .catch(err => {
        console.log(err);
        response.send("Error!!!!!");
      });
  });
  
  router.get("/article/:id", (request, response) => {
    //   console.log(request.params.id);
    //   Article.find({_id: request.params.id })
    Article.findById(request.params.id).then(article => {
      //{article: article} || {article}
      response.render("articles/show", { article, moment });
    });
  });
  
  router.delete("/article/:id/delete", (request, response) => {
    //   console.log(request.params.id);
    //   Article.find({_id: request.params.id })
    Article.findByIdAndDelete(request.params.id).then(article => {
      //{article: article} || {article}
      response.redirect("/");
    });
  });

  module.exports = router;