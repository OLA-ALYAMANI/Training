// The object or array ro body for mongo
const mongoose = require("mongoose")

const songSchema = mongoose.Schema({
    songName: String,
    singerName: String,
    AlbumName:String,
    Release:Date,
},
{ timestamps: true
})

const FSong = mongoose.model("FSong", songSchema)

module.exports = FSong