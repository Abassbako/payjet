const { createProduct, findProducts, getProducts, updateProduct, deleteProduct } = require('../controllers/productControllers');
const { Router } = require('express');

const router = Router();

router.post('/create', createProduct);
router.get('/find/:ProductId', findProducts);
router.get('/', getProducts);
router.put('/update/:ProductId', updateProduct);
router.delete('/delete/:ProductId', deleteProduct)

module.exports = router;