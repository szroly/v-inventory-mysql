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
    // Replace $2y$ with $2a$ in the hash to make it compatible with bcrypt
    const hashedPassword = user[0].password.replace('$2y$', '$2a$');

    if (bcrypt.compareSync(req.body.password, hashedPassword)) {
      const token = jwt.sign({ id: user[0].id }, process.env.SECRET_KEY, { expiresIn: '1h' })

      return res.status(200).send({ 
        token, 
        user: {
          id: user[0].id,
          name: user[0].name,
          email: user[0].email,
        }})
    } else {
      return res.status(401).send({ error: 'Invalid password'})
    }


  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).send({ error: 'No token provided' })
    }

    // Decode the token to get its expiration time
    const decoded = jwt.decode(token);
    const expiresAt = new Date(decoded.exp * 1000); // Convert expiration time to a JavaScript Date

    // Insert the token into the blacklist table
    const connection = await db;
    await connection.query('INSERT INTO token_blacklist (token, expires_at) VALUES (?, ?)', [token, expiresAt]);

    res.status(200).send({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

const loginCheck = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
      return res.status(401).send({ error: 'Unauthorized: No token provided' });
    }

    // Check if the token is blacklisted
    const connection = await db;
    const [blacklisted] = await connection.query('SELECT * FROM token_blacklist WHERE token = ?', [token]);

    if (blacklisted.length > 0) {
      return res.status(401).send({ error: 'Unauthorized: Token is invalidated' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Fetch the user from the database
    const [user] = await connection.query('SELECT id, name, email FROM users WHERE id = ?', [decoded.id]);

    if (user.length === 0) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Return the user object
    res.status(200).send({ user: user[0] });
  } catch (error) {
    res.status(401).send({ error: 'Invalid or expired token' });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
      return res.status(400).send({ error: 'No token provided' });
    }

    // Check if the token is blacklisted
    const connection = await db;
    const [blacklisted] = await connection.query('SELECT * FROM token_blacklist WHERE token = ?', [token]);

    if (blacklisted.length > 0) {
      return res.status(401).send({ error: 'Unauthorized: Token is invalidated' });
    }

    // Verify the token (ignore expiration to allow refreshing)
    const decoded = jwt.verify(token, process.env.SECRET_KEY, { ignoreExpiration: true });

    // Issue a new token
    const newToken = jwt.sign({ id: decoded.id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.status(200).send({ token: newToken });
  } catch (error) {
    res.status(401).send({ error: 'Invalid or expired token' });
  }
};

module.exports = {
  login,
  logout,
  loginCheck,
  refreshToken
}