const mongoose = require("mongoose")
const authorSchema = mongoose.Schema(
    {
        name: String,
        emailAddress: String,
        phonNumber: Number,
        // article: [articleSchema]
        dateofBirthday: Date,
        imge: String
    },
    { timestamps : true } //means createdAt and updatedAt
)

const Author = mongoose.model("Author", authorSchema)
module.exports = Author;