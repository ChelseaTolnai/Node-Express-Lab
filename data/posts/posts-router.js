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

router.get('/:id', async (req, res) => {
    try {
        const post = await db.findById(req.params.id);

        if (post.length > 0) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'The post information could not be retrieved.' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const post = await db.findById(req.params.id);
        if (post.length > 0) {
            
            const count = await db.remove(req.params.id);
            if (count > 0) {
                res.status(200).json(post);
            } 
            
        } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'The post could not be removed' });
    }
});

module.exports = router;