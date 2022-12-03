const express = require('express');
const {addTag, removeTags, getAllTags} = require('../controllers/tagController');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('test');
    res.send({message: "test"});
})

// Tags
router.post('/addTag', addTag);
router.post('/removeTags', removeTags);
router.post('/getAllTags', getAllTags);

module.exports = {
    routes: router
}