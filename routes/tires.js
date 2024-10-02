const express = require("express")

const router = express.Router()

const tiresController = require('../controllers/tires')

const authMiddleware = require('../middleware/auth')


router.get('/', authMiddleware.authenticateToken, tiresController.getTires)

router.get('/:id', authMiddleware.authenticateToken, tiresController.getTire)

router.post('/', authMiddleware.authenticateToken, tiresController.postTire)

router.delete('/:id', authMiddleware.authenticateToken, tiresController.deleteTire)


module.exports = router