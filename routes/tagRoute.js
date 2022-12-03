const express = require('express');
const {addTag, removeTag, getAllTags} = require('../controllers/tagController');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('test');
    res.send({message: "test"});
})

// Tags
router.post('/addTag', addTag);
router.post('/removeTag', removeTag);
router.post('/getAllTags', getAllTags);

module.exports = {
    routes: router
}