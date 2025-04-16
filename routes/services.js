const express = require("express")

const router = express.Router()

const authMiddleware = require('../middleware/auth')

const servicesController = require('../controllers/services')

router.get('/', authMiddleware.authenticateToken, servicesController.getServices)

router.get('/:id', authMiddleware.authenticateToken, servicesController.getService)

router.post('/', authMiddleware.authenticateToken, servicesController.postService)

router.put('/:id', authMiddleware.authenticateToken, servicesController.updateService)

router.delete('/:id', authMiddleware.authenticateToken, servicesController.deleteService)

module.exports = router