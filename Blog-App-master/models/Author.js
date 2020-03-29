const mongoose = require("mongoose");
// Author Schema
const authorSchema = mongoose.Schema(
    {
      name: String,
      emailAddress: String,
      phoneNumber: String    
    },
    {timestamps: true} // means createdAt and updateAt
  );
  
  const Author = mongoose.model("Author", authorSchema);
  
  //export to be used on other pages
  module.exports = Author;
  