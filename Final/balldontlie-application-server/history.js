//snippets connect to all middleware


const router = require('express').Router();

const config = require('./config.json');



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


// GET / get search results of keyword
router.get('/results', async (req, res) => {
    try {

        const db = req.app.locals.db;
        const collection = db.collection('History');

        //get history
        const history  = await collection.find({}).toArray();

        res.json(history);

    } catch (error) {
        res.status(500).json(error);
    }
});





module.exports = router;