const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    username: { type: String},
    roll_number : {type: String, required:true},
    email_addresses : [String],
    batches : [String],
})

module.exports = mongoose.model('user', userSchema)