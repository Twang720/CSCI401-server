'use strict';
const firebase = require('../db');
const firestore = firebase.firestore();

const addTag = async (req, res, next) => {
    try {
        // Validate Request
        if (!req.body.tag) {
            res.status(400).send({
                message: "Content must have tag name!"
            })
            return;
        }
        
        // Create a Tag
        const tag = {
            tag: req.body.tag,
        };

        // Check if Tag is in db
        const tags = await firestore.collection('tags');
        const data = await tags.get();
        if(!data.empty) {
            data.forEach(doc => {
                const t = {
                    tag: doc.data().name,
                };
                if(tag.tag == t.tag) {
                    res.status(400).send({
                        message: "Tag already exists"
                    });
                }
            });
        }

        // Add Tag to db
        await tags.doc().set(tag);
        res.send({
            message: "Tag added successfully"
        });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const removeTags = async (req, res, next) => {
    try {
        // Validate Request
        if (!req.body.tags) {
            res.status(400).send({
                message: "Content must have tags!"
            })
            return;
        }

        const tags = await firestore.collection('tags');
        req.body.tags.forEach(async tag => {
            const query = await tags.where('tag', '==', tag).get();
            query.forEach(doc => {
                doc.ref.delete();
            });
        })
        
        res.send({
            message: "Tag removed successfully"
        });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllTags = async (req, res, next) => {
    try {
        const tags = await firestore.collection('tags');
        const data = await tags.get();
        const tagArray = [];
        data.forEach(doc => {
            const tag = {
                tag: doc.data().tag,
            };
            tagArray.push(tag);
        });
        res.send(tagArray);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addTag,
    removeTags,
    getAllTags,
}