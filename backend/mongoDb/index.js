const mongoose  = require('mongoose');
require("dotenv").config();

const mongooseURL = process.env.MONGOOSE_URL;


mongoose.connect(mongooseURL);

const userSchema = new mongoose.Schema ({
  username: {type: String, required: true}, 
  email: {type: String, required: true},
  password: {type: String, required: true}
});

const todoSchema = new mongoose.Schema ({
  email: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  date: {type: String, required: true},
  status: {type: Boolean, default: false} 
});

const User = mongoose.model('User', userSchema);
const Todo = mongoose.model('Todo', todoSchema);

module.exports = {  
  User,
  Todo
}