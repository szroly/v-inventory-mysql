const express = require("express")

const router = express.Router()

const vehiclesController = require('../controllers/vehicles')

const authMiddleware = require('../middleware/auth')


router.get('/', authMiddleware.authenticateToken, vehiclesController.getVehicles)

router.get('/:id', authMiddleware.authenticateToken, vehiclesController.getVehicle)

router.post('/', authMiddleware.authenticateToken, vehiclesController.postVehicle)

router.put('/:id', authMiddleware.authenticateToken, vehiclesController.editVehicle)

router.delete('/:id', authMiddleware.authenticateToken, vehiclesController.deleteVehicle)


module.exports = router