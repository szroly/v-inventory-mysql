const express = require("express")

const router = express.Router()

const equipmentsController = require('../controllers/equipments')

const authMiddleware = require('../middleware/auth')


router.get('/', authMiddleware.authenticateToken, equipmentsController.getEquipments)

router.get('/:id', authMiddleware.authenticateToken, equipmentsController.getEquipment)

router.post('/', authMiddleware.authenticateToken, equipmentsController.postEquipment)

router.put('/:id', authMiddleware.authenticateToken, equipmentsController.editEquipment)

router.delete('/:id', authMiddleware.authenticateToken, equipmentsController.deleteEquipment)


module.exports = router