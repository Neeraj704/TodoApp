const jwt = require("jsonwebtoken");
const secretKey = "Neeraj@704";

async function userMiddleware (req, res, next) {
  try {
    const getFullToken = await req.get('authorization');
    const token = getFullToken.split(' ')[1];
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.log('Invalid token');
        return res.status(401).json({ error : 'Invalid token' });
      } else {
        console.log('Token verified');
        return res.status(200).json({ message : 'Token verified' });
      }
    });
  } catch (err) {
    console.log('Middleware error');
    return res.status(500).json({ 
      error : 'Middleware error',
      errorCode : err,
    })
  }

}

module.exports = userMiddleware;