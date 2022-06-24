const router = require('express').Router();

// require in our mock database
const mockDB = require('./db');

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
    const all = mockDB.results;

    res.json(all);
});

// POST /snippets to add a snippet in the mock DB
router.post('/', (req, res) => {
    const { body } = req;

    const id = mockDB.results.length + 1;
    const snippet = { ...body, id };

    // mock adding this snippet to the database
    mockDB.results.push(snippet);

    res.status(201).json(snippet);
});

// GET snippets/:id to return a snippet by a unique id
//colon means dynamic value being passed. 
//example snippets/1
router.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    console.log(id);
    const snippet = mockDB.results.filter((entry) => entry.id === parseInt(id));

    res.json(snippet);
});

module.exports = router;
