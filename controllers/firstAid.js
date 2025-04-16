const db = require('../config/db')

const getFirstAids = async (req,res) => {
  try {
    const connection = await db
    const [result] = await connection.query('SELECT * FROM first_aids')
    res.status(200).send(result)
  } catch (e) {
    res.status(500).send(e)
  }
}

const getFirstAid = async (req,res) => {
  const id = req.params.id
  try {
    const connection = await db
    const [result] = await connection.query('SELECT * FROM first_aids WHERE id = ?', [id])
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
    const [result] = await connection.query('INSERT INTO first_aids SET ?', firstaid)
    const [updatedFirstAid] = await connection.query('SELECT * FROM first_aids WHERE id = ?', [result.insertId])
    res.status(201).send(updatedFirstAid[0])
  } catch (e) {
    res.status(500).send(e)
  }
}

const updateFirstAid = async (req,res) => {
  const id = req.params.id
  const firstaid = req.body
  try {
    const connection = await db
    const [result] = await connection.query('UPDATE first_aids SET ? WHERE id = ?', [firstaid, id])
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'FirstAid not found'})
    }
    const [updatedFirstAid] = await connection.query('SELECT * FROM first_aids WHERE id = ?', [id])
    res.status(200).send(updatedFirstAid[0])
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

const deleteFirstAid = async (req,res) => {
  const id = req.params.id
  try {
    const connection = await db
    const [result] = await connection.query('DELETE FROM first_aids WHERE id = ?', [id])
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'FirstAid not found'})
    }
    res.status(200).send({ message: 'FirstAid deleted successfully' })
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

module.exports = {
  getFirstAids,
  getFirstAid,
  postFirstAid,
  updateFirstAid,
  deleteFirstAid
}