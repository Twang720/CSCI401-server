const express = require('express');
const {addTag, removeTag, getAllTags} = require('../controllers/tagController');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('test');
    res.send({message: "test"});
})

// Tags
router.get('/addTag', addTag);
router.get('/removeTag', removeTag);
router.get('/getAllTags', getAllTags);

module.exports = {
    routes: router
}