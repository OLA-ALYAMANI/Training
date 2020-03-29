const express = require("express");
const moment = require("moment");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const router = express.Router();
//models
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
router.get("/authors", (request, response) => {
    Author.find()
      .then(authors => {
        //   console.log(authors);
        //{ authors: authors } \\ { authors }
        //{ moment: moment } \\ { moment }
        response.render("authors/index", { authors, moment });
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  //create author routes
  router.get("/author/create", (request, response) => {
    response.render("authors/create");
  });
  
  router.post("/author/create", (request, response) => {
    console.log(request.body);
    let author = new Author(request.body);
  
    //   console.log(author);
    //save author
    author
      .save()
      .then(() => {
        //   response.send("Post worked!!");
        response.redirect("/authors/");
      })
      .catch(err => {
        console.log(err);
        response.send("Error!!!!!");
      });
  });
  
  router.get("/author/:id", (request, response) => {
    //   console.log(request.params.id);
    //   Author.find({_id: request.params.id })
    Author.findById(request.params.id).then(author => {
      //{author: author} || {author}
      response.render("authors/show", { author, moment });
    });
  });
  
  router.delete("/author/:id/delete", (request, response) => {
    //   console.log(request.params.id);
    //   Author.find({_id: request.params.id })
    Author.findByIdAndDelete(request.params.id).then(author => {
      //{author: author} || {author}
      response.redirect("/authors");
    });
  });
  module.exports = router