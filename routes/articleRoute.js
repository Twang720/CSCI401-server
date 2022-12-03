const express = require('express');
const {addArticle, removeArticle, getAllArticles} = require('../controllers/articleController');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('test');
    res.send({message: "test"});
})

// Articles
router.get('/addArticle', addArticle);
router.get('/removeArticle', removeArticle);
router.get('/getAllArticles', getAllArticles);

module.exports = {
    routes: router
}