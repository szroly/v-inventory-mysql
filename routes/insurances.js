const express = require("express")

const router = express.Router()

const authMiddleware = require('../middleware/auth')

const insurancesController = require('../controllers/insurances')

router.get('/', authMiddleware.authenticateToken, insurancesController.getInsurances)

router.get('/:id', authMiddleware.authenticateToken, insurancesController.getInsurance)

router.post('/', authMiddleware.authenticateToken, insurancesController.postInsurance)

router.put('/:id', authMiddleware.authenticateToken, insurancesController.updateInsurance)

router.delete('/:id', authMiddleware.authenticateToken, insurancesController.deleteInsurance)


module.exports = router