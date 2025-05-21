const db = require('../config/db')

const getServices = async (req, res) => {
  try {
    const connection = await db
    const [result] = await connection.query('SELECT * FROM services')
    if (result.length !== 0) {
      for (const service of result) {
        const [vehicles] = await connection.query(
          'SELECT * FROM vehicles WHERE id = ?',
          [service.vehicle_id]
        )
        service.vehicle = vehicles[0]
      }
    }
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getService = async (req, res) => {
  const id = req.params.id
  try {
    const connection = await db
    const [result] = await connection.query('SELECT * FROM services WHERE id = ?', [id])
    if (result.length === 0) {
      return res.status(404).send({ error: 'Service not found' })
    }
    res.status(200).send(result[0])
  } catch (error) {
    res.status(500).send(error)
  }
}

const postService = async (req, res) => {
  const service = req.body
  try {
    const connection = await db
    const [result] = await connection.query('INSERT INTO services SET ?', service)
    const [newService] = await connection.query('SELECT * FROM services WHERE id = ?', [result.insertId])
    res.status(201).send(newService[0])
  } catch (error) {
    res.status(500).send(error)
  }
}

const updateService = async (req, res) => {
  const id = req.params.id
  const service = req.body
  try {
    const connection = await db
    const [result] = await connection.query('UPDATE services SET ? WHERE id = ?', [service, id])
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Service not found' })
    }
    const [updatedService] = await connection.query('SELECT * FROM services WHERE id = ?', [id])
    res.status(200).send(updatedService[0])
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteService = async (req, res) => {
  const id = req.params.id
  try {
    const connection = await db
    const [result] = await connection.query('DELETE FROM services WHERE id = ?', [id])
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Service not found' })
    }
    res.status(200).send({ message: 'Service deleted successfully' })
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
  getServices,
  getService,
  postService,
  updateService,
  deleteService
}