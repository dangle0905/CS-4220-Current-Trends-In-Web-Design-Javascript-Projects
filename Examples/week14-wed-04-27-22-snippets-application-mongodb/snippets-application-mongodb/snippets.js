//snippets connect to all middleware

const jwt = require('jsonwebtoken');

const router = require('express').Router();

const config = require('./config.json');

const ObjectId = require('mongodb').ObjectId;

// authorization middleware for specific route endpoint
const verifyAccessToken = (req, res, next) => {
    const { authorization } = req.headers;

    // check that there is an authorization header and that it begins with Bearer
    if (authorization && authorization.startsWith('Bearer')) {
        // split header on a space and pop out the token string
        const token = authorization.split(' ').pop();
        console.log(token);
        jwt.verify(token, config.secret, (error, success) => {
            if (error) {
                res.status(403).json({ error: `Access Forbidden` });
            } else {
                // if no error read the username from the success and add it to the req
                req.username = success.username;
                // call the next middleware or route in line
                next();
            }
        });
    }
};

// apply router level middleware
router.use((req, res, next) => {
    console.log('Running Router Level Middleware');

    if (req.method === 'POST' && req.body) {
        const { body } = req;
        body.created = new Date();
    }

    // this middleware is done processing and move on to the next thing in line
    next();
});

// GET /snippets and it will return all snippets in the mock DB
router.get('/', async (req, res) => {
    try {
        // get all snippets from snippets collection in the mock database
        const db = req.app.locals.db;
        const collection = db.collection('Snippets');

        // get all snippets by passing in an empty object for finding everything
        const all = await collection.find({}).toArray();

        res.json(all);
    } catch (error) {
        res.status(500).json(error);
    }
});

// POST /snippets to add a snippet in the mock DB
router.post('/', verifyAccessToken, async (req, res) => {
    try {
        const { body } = req;

        // author is the user logged in
        const author = req.username;

        // override author and set it to the logged in user
        const snippet = { ...body, author };

        const db = req.app.locals.db;
        const collection = db.collection('Snippets');

        // add a snippets to snippets collection in the mongo database
        await collection.insertOne(snippet);

        res.status(201).json(snippet);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET snippets/:id to return a snippet by a unique id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const db = req.app.locals.db;
        const collection = db.collection('Snippets');

        // get a snippet by id from snippets collection in the mongodb database
        // use ObjectId to cast the string id to a mongo objectid type
        const snippet = await collection.find({ _id: ObjectId(id) }).next();

        res.json(snippet);
    } catch (error) {
        res.status(500).json(error);
    }
});

// LAB #4
// PUT snippets/:id to update a snippet by a unique id
router.put('/:id', verifyAccessToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;

        const db = req.app.locals.db;
        const collection = db.collection('Snippets');

        // get a snippet by id from snippets collection in the mongo database
        const snippet = await collection.find({ _id: ObjectId(id) }).next();

        if (snippet.author === req.username) {
            // author is the user logged in
            const author = req.username;

            // override the snippet with the user changes
            // override author and set it to the logged in user
            const data = { ...snippet, ...body, author };

            // update a snippet by id from snippets collection in the mongo database
            await collection.updateOne({ _id: ObjectId(id) }, { $set: data });

            // return the data with the mongo _id
            res.json({ ...data, _id: id });
        } else {
            // 403 status code means Forbiden
            res.status(403).json({
                error: `Not authorized to edit the snippet authored by ${snippet.author}`
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
