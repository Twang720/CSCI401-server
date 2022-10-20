const express = require('express');
const {addUser, getAllUsers, getUser} = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('test');
    res.send({message: "test"});
})

router.get('/getAll', getAllUsers);
router.get('/get', getUser);
router.post('/create', addUser);

module.exports = {
    routes: router
}