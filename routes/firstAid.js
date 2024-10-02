const express = require("express")

const router = express.Router()

const firstAidController = require('../controllers/firstAid')

const authMiddleware = require('../middleware/auth')


router.get('/', authMiddleware.authenticateToken, firstAidController.getFirstAids)

router.get('/:id', authMiddleware.authenticateToken, firstAidController.getFirstAid)

router.post('/', authMiddleware.authenticateToken, firstAidController.postFirstAid)

router.delete('/:id', authMiddleware.authenticateToken, firstAidController.deleteFirstAid)


module.exports = router