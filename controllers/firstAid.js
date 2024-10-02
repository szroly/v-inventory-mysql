const db = require('../config/db')

const getFirstAids = async (req,res) => {
  try {
    const connection = await db
    const [result] = await connection.query('SELECT * FROM firstaid')
    res.status(200).send(result)
  } catch (e) {
    res.status(500).send(e)
  }
}

const getFirstAid = async (req,res) => {
  const id = req.params.id
  try {
    const connection = await db
    const [result] = await connection.query('SELECT * FROM firstaid WHERE id = ?', [id])
    if (result.length === 0) {
      res.status(404).send({ error: 'FirstAid not found'})
    }
    res.status(200).send(result)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

const postFirstAid = async (req,res) => {
  const firstaid = req.body
  try {
    const connection = await db
    const [result] = await connection.query('INSERT INTO firstaid SET ?', firstaid)
    res.status(201).send(firstaid)
  } catch (e) {
    res.status(500).send(e)
  }
}

const deleteFirstAid = async (req,res) => {
  const id = req.params.id
  try {
    const connection = await db
    const [result] = await connection.query('DELETE FROM firstaid WHERE id = ?', [id])
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'FirstAid not found'})
    }
    res.status(200).send(result)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

module.exports = {
  getFirstAids,
  getFirstAid,
  postFirstAid,
  deleteFirstAid
}