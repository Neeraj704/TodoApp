const userMiddleware = require('./middleware');
const bodyParser = require('body-parser');
const { User } = require('./mongoDb');
const { Todo } = require('./mongoDb');
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
require("dotenv").config();
const secretKey = process.env.JWT_KEY;
const app = express();
const PORT = 3000;
app.use(cors()); 
app.use(bodyParser.json());

app.post('/signup', async (req, res) => {
  try { 
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    if (!email) {
      return res.status(410).json({ error : 'Enter the email id to signup'});
    }
    if (!password) {
      return res.status(410).json({ error : 'Enter the password to signup'});
    }
    if (!username) {
      return res.status(410).json({ error : 'Enter the username to signup'});
    }
    const findingUser = await User.findOne({ email });
    if (!findingUser) {
      const newUser = await User.create({ 
        username: username,
        email: email,    
        password: password
      });
      const userToken = jwt.sign({email, password, username}, secretKey);
      return res.status(200).json({ 
        message : 'User created successfully',
        token : userToken
      });
    } else {
      return res.status(401).json({ error : 'An account already exists with this email'}); 
    }
  } catch (err) { 
    return res.status(500).json({ error : 'Server error, try again later'});
  }
}); 

app.post('/signin', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const findingUser = await User.findOne({ email }); 
    if (!email) {
      return res.status(410).json({ error : 'Enter the email id to login'});
    }
    if (!password) {
      return res.status(410).json({ error : 'Enter the password to login'});
    }
    if (findingUser) { 
      if (password === findingUser.password) {
        const username = findingUser.username;
        const userToken = jwt.sign({email, password, username}, secretKey);
        return res.status(200).json({ 
          message : 'Signed in successfully',
          token : userToken
        });
      } else {
        return res.status(401).json({ error : 'Incorrect Password' });
      }
    } else {
      return res.status(401).json({ error : 'User does not exist, signup instead' });
    }
  } catch (err) { 
    return res.status(500).json({ error : 'Server error, try again later'});
  }
});

app.post('/create', userMiddleware, async (req, res) => {
  try {
    const email = jwt.decode(req.get('authorization').split(' ')[1]).email;
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;
    const date = req.body.date;
    if (!title) { 
      return res.status(400).json({ error : 'Please input a title' });
    };
    if (!description) {
      return res.status(400).json({ error : 'Please input a description' });
    };
    if (!date) {
      return res.status(400).json({ error : 'Please select a date' });
    };
    const newTodo = await Todo.create({
      email: email,
      title: title,
      description: description,
      date: date,
      status: status
    });
    return res.status(200).json({ 
      message : 'Todo created successfully',
      todoId : newTodo._id
    }); 
  } catch (err) {
    return res.status(500).json({ error : 'Server error, try again later'});
  }
});

app.get('/read', userMiddleware, async (req, res) => {
  try {
    const email = jwt.decode(req.get('authorization').split(' ')[1]).email;
    const allTodos = await Todo.find({ email });
    return res.status(200).json({ 
      message : 'Here are all your todos',
      todos : allTodos
    });
  } catch (err) {
    return res.status(500).json({ error : 'Server error, try again later'});
  }
});

app.delete('/delete', userMiddleware, async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    if (!title) { 
      return res.status(400).json({ error : 'Please input a title' });
    };
    if (!description) {
      return res.status(400).json({ error : 'Please input a description' });
    };
    await Todo.findOneAndDelete({
      title: title,
      description: description
    });
    return res.status(200).json({ message : 'Todo deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error : 'Server error, try again later'});
  }
});

app.delete('/deleteall', userMiddleware, async (req, res) => {
  try {
    const email = jwt.decode(req.get('authorization').split(' ')[1]).email;
    await Todo.deleteMany({email});
    return res.status(200).json({ message : 'All todos deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error : 'Server error, try again later'});
  }
}); 

app.put('/update', userMiddleware, async (req, res) => {
 try {
    const newTitle = req.body.title;
    const newDescription = req.body.description;
    const newStatus = req.body.status;
    const oldTitle = req.body.oldTitle;
    const oldDescription = req.body.oldDescription;
    
    await Todo.findOneAndUpdate({
      title: oldTitle,
      description: oldDescription
    }, {
      title : newTitle,
      description : newDescription,
      status : newStatus
    });
    return res.status(200).json({ message : 'Todo updated successfully' });
  } catch (err) { 
    return res.status(500).json({ error : 'Server error, try again later'});
  } 
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT);