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
    // Get vehicle basic info
    const [vehicleResult] = await connection.query('SELECT * FROM vehicles WHERE id = ?', [id])

    if (vehicleResult.length === 0) {
      res.status(404).send({ error: 'Vehicle not found'})
      return
    }

    // Get related data
    const [firstAid] = await connection.query('SELECT * FROM first_aids WHERE vehicle_id = ?', [id])
    const [insurance] = await connection.query('SELECT * FROM insurances WHERE vehicle_id = ?', [id])
    const [equipments] = await connection.query('SELECT * FROM equipment WHERE vehicle_id = ?', [id])
    const [service] = await connection.query('SELECT * FROM services WHERE vehicle_id = ?', [id])
    // const [tires] = await connection.query('SELECT * FROM tires WHERE vehicle_id = ?', [id])

    // Combine all data
    const result = {
      ...vehicleResult[0],
      firstAid,
      insurance,
      equipments,
      service,
      // tires
    }
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
    const [updatedVehicle] = await connection.query('SELECT * FROM vehicles WHERE id = ?', [id])
    res.status(200).send(updatedVehicle[0])
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
    res.status(200).send({ message: 'Vehicle deleted successfully' })
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