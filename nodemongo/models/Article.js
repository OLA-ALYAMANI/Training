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
    // لانه تم تعريفه بالسفل
    // author:String
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
},
        {timestamps: true} //means createdAt and updatedAt
)

const Article = mongoose.model("Article", articleSchema);

// Author Schema
// const authorSchema = mongoose.Schema(
//     {
//         name: String,
//         emailAddress: String,
//         phonNumber: Number,
//         article: [articleSchema]
//     },
//     { timestamps : true } //means createdAt and updatedAt
// )

// const Author = mongoose.model("Author", authorSchema)
// export to be used on other pages
// التصدير لاستخدامها على صفحات أخرى
module.exports = Article