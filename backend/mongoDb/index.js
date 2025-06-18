const mongoose  = require('mongoose');
require("dotenv").config();

const mongooseURL = process.env.MONGOOSE_URL;


mongoose.connect(mongooseURL);

const userSchema = new mongoose.Schema ({
  username: String,
  email: String,
  password: String
});

const todoSchema = new mongoose.Schema ({
  email: String,
  title: String,
  description: String,
  date: String,
  status: { type: Boolean, default: false } 
});

const User = mongoose.model('User', userSchema);
const Todo = mongoose.model('Todo', todoSchema);

module.exports = {  
  User,
  Todo
}