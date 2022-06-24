const router = require('express').Router();

const jwt = require('jsonwebtoken');

const config = require('./config.json');
// require in our mock database collection
const collection = require('./mock_db/snippet_collection');

// apply route level middleware
const verifyAccessToken = (req, res, next) => {
    const { authorization } = req.headers;

    // checking that there is an authorization header and that it start with Bearer
    if (authorization && authorization.startsWith('Bearer')) {
        // the token is formatted as Bearer <token> so splitting on the space to pop out the token
        const token = authorization.split(' ').pop();

        // pass in the token, secret and callback to verify this is the same user
        jwt.verify(token, config.jwt_secret, (error, success) => {
            if (!error) {
                // if no error read the username from the success and add it to the req
                req.username = success.username;
                // call the next middleware or route in line
                next();
            } else {
                // if there is an error respond and prevent access to the route
                res.status(403).json({ error: 'Access Forbidden' });
            }
        });
    } else {
        // if there is no authorization header and it is not Bearer
        // respond and prevent access to the route
        res.status(403).json({ error: 'Access Forbidden' });
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
router.get('/', (req, res) => {
    try {

        // get all snippets from snippets collection in the mock database
        const all = collection.all();

        res.json(all);
    } catch (error) {
        res.status(500).json(error);
    }
});

// POST /snippets to add a snippet in the mock DB
router.post('/', verifyAccessToken, (req, res) => {
    try {
        const { body } = req;

        // read the username from what was set in the verifyAccessToken middleware
        // this is the user that is logged and authenticated
        const author = req.username;

        // override the author and set it to the logged in/authenticated user
        const data = { ...body, author };

        // add a snippets to snippets collection in the mock database
        const snippet = collection.add(data);

        res.status(201).json(snippet);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET snippets/:id to return a snippet by a unique id
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;

        // get a snippet by id from snippets collection in the mock database
        // pass in the id as a number
        const snippet = collection.get(parseInt(id));

        res.json(snippet);
    } catch (error) {
        res.status(500).json(error);
    }
});

// LAB #4
// PUT snippets/:id to update a snippet by a unique id
router.put('/:id', verifyAccessToken, (req, res) => {
    try {
        //the id form url
        const { id } = req.params;

        // get a snippet by id from snippets collection in the mock database
        // pass in the id as a number
        const snippet = collection.get(parseInt(id));

        //this is what you are updating
        const { body } = req;

        const data = { ...body};


        if (req.username === snippet.author){

            collection.update(parseInt(id), data);
            res.status(200).json(body);

        }else{
            res.status(403).json({error: `Not authorized to edit the snippet authored by ${snippet.author}`})
        }


    } catch (error) {
        res.status(500).json(error);
    }
});
module.exports = router;
