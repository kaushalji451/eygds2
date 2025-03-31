const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : String,
    email : String,
    password : String,
    phoneno : Number,
    house : String,
    street : String,
    city : String,
    state : String,
});

const User  = new mongoose.model("User",UserSchema);
module.exports = User;