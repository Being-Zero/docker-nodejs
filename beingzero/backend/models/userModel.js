const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    username: { type: String, required:true},
    roll_number : String,
    email_addresses : [String],
    batches : [String],
})

module.exports = mongoose.model('user', userSchema)