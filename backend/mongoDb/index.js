const mongoose  = require('mongoose');

mongoose.connect('mongodb+srv://Neeraj704sky:Neeraj704sky@todoapp.obqdvdb.mongodb.net/TodoApp');

const userSchema = new mongoose.Schema ({
  username: String,
  password: String
});

const todoSchema = new mongoose.Schema ({
  user: String,
  title: String,
  description: String,
  status: { type: Boolean, default: false } 
});

const User = mongoose.model('User', userSchema);
const Todo = mongoose.model('Todo', todoSchema);

module.exports = {
  User,
  Todo
}