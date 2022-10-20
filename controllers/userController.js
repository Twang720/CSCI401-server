'use strict';
const bcrypt = require('bcrypt');
const firebase = require('../db');
const User = require('../models/user');
const firestore = firebase.firestore();

const addUser = async (req, res, next) => {
    try {
        // Validate Request
        if (!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName) {
            res.status(400).send({
                message: "Content can not be empty!"
            })
            return;
        }
    
        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(req.body.password, salt);
        
        // Create a User
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: pass
        };
        console.log(user);

        // Add user to db
        await firestore.collection('users').doc().set(user);
        res.send('User added successfully');
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await firestore.collection('users');
        const data = await users.get();
        const userArray = [];
        if(data.empty) {
            res.status(404).send("No users");
        }
        else {
            data.forEach(doc => {
                const user = {
                    id: doc.id,
                    firstName: doc.data().firstName,
                    lastName: doc.data().lastName,
                    email: doc.data().email,
                    password: doc.data().password
                };
                userArray.push(user);
            });
            res.send(userArray);
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getUser = async (req, res, next) => {
    try {
        //req.params.id;
        const id = req.body.id;
        console.log(id);
        const student = await firestore.collection('users').doc(id);
        const data = await student.get();
        if(!data.exists) {
            res.status(400).send("User not found");
        }
        else {
            res.send(data.data());
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addUser,
    getAllUsers,
    getUser
}