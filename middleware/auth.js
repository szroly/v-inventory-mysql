const jwt = require('jsonwebtoken')

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
  }

}