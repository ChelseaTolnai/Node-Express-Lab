const express = require('express');
const db = require('../db')

const router = express.Router();

router.post('/', async (req, res) => {
    if(!req.body.title || ! req.body.contents) {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
        return;
    } else {
        try {
            const post = await db.insert(req.body);
            res.status(201).json(post);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'The posts information could not be retrieved.' });
        }
    }
});

router.get('/', async (req, res) => {
    try {
        const posts = await db.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'The posts information could not be retrieved.' });
    }
  });

module.exports = router;