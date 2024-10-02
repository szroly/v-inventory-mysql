const db = require('../config/db')

const getVehicles = async (req,res) => {
  try {
    const connection = await db
    const [result] = await connection.query('SELECT * FROM vehicles')
    res.status(200).send(result)
  } catch (e) {
    res.status(500).send(e)
  }
}

const getVehicle = async (req,res) => {
  const id = req.params.id
  try {
    const connection = await db
    const [result] = await connection.query('SELECT * FROM vehicles WHERE id = ?', [id])
    if (result.length === 0) {
      res.status(404).send({ error: 'Vehicle not found'})
    }
    res.status(200).send(result)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

const postVehicle = async (req,res) => {
  const vehicle = req.body
  try {
    const connection = await db
    const [result] = await connection.query('INSERT INTO vehicles SET ?', vehicle)
    res.status(201).send(vehicle)
  } catch (e) {
    res.status(500).send(e)
  }
}

const editVehicle = async (req,res) => {
  const vehicle = req.body
  const id = req.params.id
  try {
    const connection = await db
    const [result] = await connection.query('UPDATE vehicles SET ? WHERE id = ?', [vehicle, id])
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Vehicle not found'})
    }
    res.status(200).send(result)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

const deleteVehicle = async (req,res) => {
  const id = req.params.id
  try {
    const connection = await db
    const [result] = await connection.query('DELETE FROM vehicles WHERE id = ?', [id])
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Vehicle not found'})
    }
    res.status(200).send(result)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

module.exports = {
  getVehicles,
  getVehicle,
  postVehicle,
  editVehicle,
  deleteVehicle
}