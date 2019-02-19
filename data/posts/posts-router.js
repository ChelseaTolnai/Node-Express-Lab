const express = require('express');
const db = require('../db')

const router = express.Router();

router.post('/', (req, res) => {
    if(!req.body.title || ! req.body.contents) {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
        return;
    } else {
        db
        .insert(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch (error => {
            console.log(error);
            res.status(500).json({ error: 'There was an error while saving the post to the database' });
        });
    }
})

module.exports = router;