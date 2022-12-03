const express = require('express');
const {addArticle, removeArticle, getAllArticles} = require('../controllers/articleController');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('test');
    res.send({message: "test"});
})

// Articles
router.post('/addArticle', addArticle);
router.post('/removeArticle', removeArticle);
router.post('/getAllArticles', getAllArticles);

module.exports = {
    routes: router
}