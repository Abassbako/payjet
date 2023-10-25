const { createCarts, findCart, getCarts, updateCart, deleteCart } = require('../controllers/cartControllers');
const { Router } = require('express');

const router = Router();

router.post('/create', createCarts);
router.get('/find/:UserId', findCart);
router.get('/', getCarts);
router.put('/update/:_id', updateCart);
router.delete('/delete/:_id', deleteCart);

module.exports = router;