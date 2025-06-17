const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('./mongoDb');
const jwt = require('jsonwebtoken');
const secretKey = "Neeraj@704";
const app = express();
const PORT = 3000;

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
    console.log(err);
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
    console.log(err);
    return res.status(500).json({ error : 'Server error, try again later'});
  }
});




app.listen(PORT);