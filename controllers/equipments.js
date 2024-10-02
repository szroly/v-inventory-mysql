const db = require('../config/db')

const getEquipments = async (req,res) => {
  try {
    const connection = await db
    const [result] = await connection.query('SELECT * FROM equipment')
    res.status(200).send(result)
  } catch (e) {
    res.status(500).send(e)
  }
}

const getEquipment = async (req,res) => {
  const id = req.params.id
  try {
    const connection = await db
    const [result] = await connection.query('SELECT * FROM equipment WHERE id = ?', [id])
    if (result.length === 0) {
      res.status(404).send({ error: 'Equipment not found'})
    }
    res.status(200).send(result)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

const postEquipment = async (req,res) => {
  const equipment = req.body
  try {
    const connection = await db
    const [result] = await connection.query('INSERT INTO equipment SET ?', equipment)
    res.status(201).send(equipment)
  } catch (e) {
    res.status(500).send(e)
  }
}

const editEquipment = async (req,res) => {
  const equipment = req.body
  const id = req.params.id
  try {
    const connection = await db
    const [result] = await connection.query('UPDATE equipment SET ? WHERE id = ?', [equipment, id])
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Equipment not found'})
    }
    res.status(200).send(result)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

const deleteEquipment = async (req,res) => {
  const id = req.params.id
  try {
    const connection = await db
    const [result] = await connection.query('DELETE FROM equipment WHERE id = ?', [id])
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Equipment not found'})
    }
    res.status(200).send(result)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

module.exports = {
  getEquipments,
  getEquipment,
  postEquipment,
  editEquipment,
  deleteEquipment
}