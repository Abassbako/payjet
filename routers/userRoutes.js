const { registerUser, loginUser, findUser, getUsers, updateUser, deleteUser } = require('../controllers/userControllers');
const { Router } = require('express');


const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/find/:UserId', findUser);
router.get('/', getUsers);
router.put('/update/:_id', updateUser);
router.delete('/delete/:_id', deleteUser);

module.exports = router;