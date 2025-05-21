const db = require('../config/db')

const getInsurances = async (req, res) => {
  try {
    const connection = await db
    const [result] = await connection.query('SELECT * FROM insurances')
    if (result.length !== 0) {
      for (const insurance of result) {
        const [vehicles] = await connection.query(
          'SELECT * FROM vehicles WHERE id = ?',
          [insurance.vehicle_id]
        )
        insurance.vehicle = vehicles[0]
      }
    }
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getInsurance = async (req, res) => {
  const id = req.params.id
  try {
    const connection = await db
    const [result] = await connection.query('SELECT * FROM insurances WHERE id = ?', [id])
    if (result.length === 0) {
      return res.status(404).send({ error: 'Insurance not found' })
    }
    res.status(200).send(result[0])
  } catch (error) {
    res.status(500).send(error)
  }
}

const postInsurance = async (req, res) => {
  const insurance = req.body
  try {
    const connection = await db
    const [result] = await connection.query('INSERT INTO insurances SET ?', insurance)
    const [newInsurance] = await connection.query('SELECT * FROM insurances WHERE id = ?', [result.insertId])
    res.status(201).send(newInsurance[0])
  } catch (error) {
    res.status(500).send(error)
  }
}

const updateInsurance = async (req, res) => {
  const id = req.params.id
  const insurance = req.body
  try {
    const connection = await db
    const [result] = await connection.query('UPDATE insurances SET ? WHERE id = ?', [insurance, id])
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Insurance not found' })
    }
    const [updatedInsurance] = await connection.query('SELECT * FROM insurances WHERE id = ?', [id])
    res.status(200).send(updatedInsurance[0])
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteInsurance = async (req, res) => {
  const id = req.params.id
  try {
    const connection = await db
    const [result] = await connection.query('DELETE FROM insurances WHERE id = ?', [id])
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Insurance not found' })
    }
    res.status(200).send({ message: 'Insurance deleted successfully' })
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
  getInsurances,
  getInsurance,
  postInsurance,
  updateInsurance,
  deleteInsurance,
  // Add other insurance-related functions here as needed
}