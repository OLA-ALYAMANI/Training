const mongoose = require("mongoose")

const articleSchema = mongoose.Schema({
    // titel: String,
    // content: String,
    // publishedOn: Date,
    // published: Boolean,
    // createdAt:{
    //     type: Date,
    //     Default: Date.new
    // },
    // updatedAt: Date
    titel: String,
    content: String,
    publishedOn: Date,
    ispublished: Boolean,
    author:String
},
        {timestamps: true} //means createdAt and updatedAt
)

const Article = mongoose.model("Article", articleSchema);