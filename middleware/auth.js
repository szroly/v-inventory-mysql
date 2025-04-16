const jwt = require('jsonwebtoken')
const db = require('../config/db')

module.exports = {
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({
        status: 401,
        message: 'Access denied.No token provided'
      })
    }

    const secretKey = process.env.SECRET_KEY
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({
          status: 403,
          message: 'Access denied. Invalid token'
        })
      }
      req.user = user
      next()
    })
  },

  loginCheck: async ( req, res, next ) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
      if (!token) {
        return res.status(401).send({ error: 'Unauthorized' });
      }
  
      // Check if the token is blacklisted
      const connection = await db;
      const [blacklisted] = await connection.query('SELECT * FROM token_blacklist WHERE token = ?', [token]);
  
      if (blacklisted.length > 0) {
        return res.status(401).send({ error: 'Token is invalidated' });
      }
  
      // Verify the token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded; // Attach user info to the request object
      next();
    } catch (error) {
      res.status(401).send({ error: 'Invalid or expired token' });
    }
  }

}