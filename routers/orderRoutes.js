const { newOrder, findOrder, updateOrder, getOrders, deleteOrder } = require('../controllers/orderControllers');
const { Router } = require('express');

const router = Router();

router.post('/create', newOrder);
router.get('/find/:UserId', findOrder);
router.put('/update/:UserId', updateOrder);
router.get('/', getOrders);
router.delete('/delete/:_id', deleteOrder);

module.exports = router;