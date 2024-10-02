const db = require('../config/db')

const getTires = async (req,res) => {
  try {
    const connection = await db
    const [result] = await connection.query('SELECT * FROM tires')
    res.status(200).send(result)
  } catch (e) {
    res.status(500).send(e)
  }
}

const getTire = async (req,res) => {
  const id = req.params.id
  try {
    const connection = await db
    const [result] = await connection.query('SELECT * FROM tires WHERE id = ?', [id])
    if (result.length === 0) {
      res.status(404).send({ error: 'Tire not found'})
    }
    res.status(200).send(result)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

const postTire = async (req,res) => {
  const tire = req.body
  try {
    const connection = await db
    const [result] = await connection.query('INSERT INTO tires SET ?', tire)
    res.status(201).send(tire)
  } catch (e) {
    res.status(500).send(e)
  }
}

const deleteTire = async (req,res) => {
  const id = req.params.id
  try {
    const connection = await db
    const [result] = await connection.query('DELETE FROM tires WHERE id = ?', [id])
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Tire not found'})
    }
    res.status(200).send(result)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

module.exports = {
  getTires, 
  getTire,
  postTire,
  deleteTire
}