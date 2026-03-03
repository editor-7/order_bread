const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');
const { requireAuth, requireAdmin } = require('../middleware/auth');

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', requireAuth, requireAdmin, productController.create);
router.put('/:id', requireAuth, requireAdmin, productController.update);
router.delete('/:id', requireAuth, requireAdmin, productController.remove);

module.exports = router;
