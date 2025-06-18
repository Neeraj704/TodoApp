const userMiddleware = require('./middleware');
const bodyParser = require('body-parser');
const { User } = require('./mongoDb');
const { Todo } = require('./mongoDb');
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
const secretKey = "Neeraj@704";
const app = express();
const PORT = 3000;
app.use(cors()); 
app.use(bodyParser.json());

app.post('/signup', async (req, res) => {
  try { 
    const username = req.body.username;
    const password = req.body.password;
    const findingUser = await User.findOne({ username });
    if (!findingUser) {
      const newUser = await User.create({ 
        username: username,    
        password: password
      });
      console.log(newUser);
      return res.status(201).json({ message : 'User created successfully' });
    } else {
      return res.status(208).json({ error : 'A user already exists with this username, signin instead'}); 
    }
  } catch (err) { 
    return res.status(500).json({ error : 'Server error, try again later'});
  }
}); 

app.post('/signin', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const findingUser = await User.findOne({ username }); 
    if (findingUser) { 
      if (password === findingUser.password) {
        const userToken = jwt.sign({username, password}, secretKey);
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
    const user = jwt.decode(req.get('authorization').split(' ')[1]).username;
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;
    if (!title) {
      return res.status(400).json({ error : 'Please input a title' });
    };
    if (!description) {
      return res.status(400).json({ error : 'Please input a description' });
    };
    const newTodo = await Todo.create({
      user: user,
      title: title,
      description: description,
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
    const user = jwt.decode(req.get('authorization').split(' ')[1]).username;
    const allTodos = await Todo.find({ user });
    return res.status(200).json({ 
      message : 'Here are all your todos',
      todos : allTodos
    });
  } catch (err) {
    return res.status(500).json({ error : 'Server error, try again later'});
  }
});

app.delete('/delete/:deleteId', userMiddleware, async (req, res) => {
  try {
    const toDeleteId = req.params.deleteId;
    await Todo.findByIdAndDelete(toDeleteId);
    return res.status(200).json({ message : 'Todo deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error : 'Server error, try again later'});
  }
});

app.delete('/deleteall', userMiddleware, async (req, res) => {
  try {
    const user = jwt.decode(req.get('authorization').split(' ')[1]).username;
    await Todo.deleteMany({user});
    return res.status(200).json({ message : 'All todos deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error : 'Server error, try again later'});
  }
}); 

app.put('/update/:updateId', userMiddleware, async (req, res) => {
 try {
    const toUpdateId = req.params.updateId;
    const newTitle = req.body.title;
    const newDescription = req.body.description;
    const newStatus = req.body.status;
    await Todo.findByIdAndUpdate(toUpdateId, {
      title : newTitle,
      description : newDescription,
      status : newStatus
    });
    return res.status(200).json({ message : 'Todo updated successfully' });
  } catch (err) { 
    return res.status(500).json({ error : 'Server error, try again later'});
  } 
});

app.listen(PORT);