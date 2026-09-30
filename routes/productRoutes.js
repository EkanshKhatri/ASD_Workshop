const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/productController')

router.get('/', ctrl.listAll)
router.get('/:id', ctrl.getSingle)

router.post('/', ctrl.createNew)
router.put('/:id', ctrl.updateExisting)
router.delete('/:id', ctrl.deleteItem)

module.exports = router
