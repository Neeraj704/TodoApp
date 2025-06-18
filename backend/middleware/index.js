const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_KEY;

async function userMiddleware (req, res, next) {
  try {
    const getFullToken = await req.get('authorization');
    const token = getFullToken.split(' ')[1];
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ 
          error : 'Invalid token' 
        });
      } else {
        next();
      }
    });
  } catch (err) {
    return res.status(500).json({ 
      error : 'Middleware error'
    })
  }

}

module.exports = userMiddleware;