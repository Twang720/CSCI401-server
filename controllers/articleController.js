'use strict';
const firebase = require('../db');
const firestore = firebase.firestore();

const addArticle = async (req, res, next) => {
    try {
        // Validate Request
        if (!req.body.title || !req.body.link || !req.body.tag) {
            res.status(400).send({
                message: "Content must have title, link, and a tag!"
            })
            return;
        }
        
        // Create an Article
        const article = {
            title: req.body.title,
            link: req.body.link,
            tag: req.body.tag,
        };
        console.log(article);

        // Add Article to db
        await firestore.collection('articles').doc().set(article);
        res.send('Article added successfully');
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const removeArticle = async (req, res, next) => {
    try {
        // Validate Request
        if (!req.body.link) {
            res.status(400).send({
                message: "Content must have link!"
            })
            return;
        }

        var found = false;
        const articles = await firestore.collection('articles');
        const query = await articles.where('link', '==', req.body.link).get();
        query.forEach(doc => {
            doc.ref.delete();
            found = true;
        });
        if(!found) {
            res.status(404).send('Article doesn\'t exist');
        }
        else {
            res.send("Article removed");
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllArticles = async (req, res, next) => {
    try {
        const articles = await firestore.collection('articles');
        const data = await articles.get();
        const articleArray = [];
        if(data.empty) {
            res.status(404).send("No articles");
        }
        else {
            data.forEach(doc => {
                const article = {
                    title: doc.data().title,
                    link: doc.data().link,
                    tag: doc.data().tag,
                };
                articleArray.push(article);
            });
            res.send(articleArray);
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addArticle,
    removeArticle,
    getAllArticles,
}