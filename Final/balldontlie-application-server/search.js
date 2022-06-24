const router = require('express').Router();
const ballDontLieAPI = require('balldontlie-api');

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
router.get('/players', async (req, res) => {
    try {
        //to get the queries use req.query not req.params
        const {name} = req.query;

        const results = await ballDontLieAPI.searchPlayers(name);
        let count = 0;
        let data = [];

        results.data.forEach( player => {
            count++;
            data.push({id: player.id, first_name: player.first_name, last_name: player.last_name});
        })

        //responds back with json object. count is number of results and results is data
        res.json(
            {
            resultCount: count,
            results: data
        });

    } catch (error) {
        res.status(500).json(error);
    }
});


// POST /users/register to register a new account on snippets app
router.post('/players/details', async (req, res) => {
    try {
        const {id, name} = req.body;
        
        //initialize db
        const db = req.app.locals.db;
        //access database
        const collection = db.collection('History');

        const count = [];


        if (id != undefined && name != undefined){
            const playerDetail = await ballDontLieAPI.searchID(id);
            //check if player exist from this id
            if (playerDetail.status === 404){
                //404 was able to send request but wasn't found, player doesn't exist
                res.status(404).send("id doesn't exist");
            }
            //if id good and name value matches 
            else if (playerDetail.first_name.toLowerCase() === name.toLowerCase() || playerDetail.last_name.toLowerCase() === name.toLowerCase()){
                count.push(playerDetail);
                timestamp = new Date().getTime();
                await collection.insertOne({keyword: name, count: count.length, selectedId: id, selectedText: name, timestamp: timestamp});
                res.status(200).json({ resultCount: count.length, playerDetail: playerDetail});
            //if only 1 of the 2 keys values are enter (requires two);
            }else{
                //bad request
                res.status(400).json("no id and name match for a player")
            }
        }else{
            //status 400 bad request
            res.status(400).send("Enter id and name please");
        }

    } catch (error) {
        res.status(400).json({ error: "bad request" });
    }
});


module.exports = router;