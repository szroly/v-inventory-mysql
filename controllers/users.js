const db = require('../config/db')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const login = async (req, res) => {
  
  try {
    const connection = await db
    const email = req.body.email
    const [user] = await connection.query('SELECT * FROM users WHERE email = ?', email)

    if (user.length === 0) {
      return res.status(404).send({ error: 'User not found'})
    }

    if (bcrypt.compareSync(req.body.password, user[0].password)) {
      const token = jwt.sign({ id: user[0].id }, process.env.SECRET_KEY, { expiresIn: '1h' })

      return res.status(200).send({ token })
    } else {
      return res.status(401).send({ error: 'Invalid password'})
    }


  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

const logout = async (req, res) => {
  try {
    const token = ""
    res.status(200).send({ message: 'Logout successful', token: token })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

module.exports = {
  login,
  logout
}