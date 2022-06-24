const router = require('express').Router();

const bcrypt = require('bcrypt');

const collection = require('./mock_db/user_collection');

    router.post('/register/', async (req, res) => {
        try{
            const {username, password} = req.body;
            
            const salt = await bcrypt.genSalt();
            const hashed = await bcrypt.hash(password, salt);

            //for test purposes only to log this data out
            console.log(salt, hashed);

            //res.json({username, password: hashed});

            collection.add({username, password: hashed});

            res.json({success: true})
        }catch(error){
            res.status(500).json({error: error.toString() });
        }
    })

    router.post('/login', async (req, res)=> {
        try{
            const {username, password} = req.body;
            const user = collection.get(username)
            const authenticated = await bcrypt.compare(password, user.password)
            console.log(authenticated);

            res.json({authenticated})

        }catch(error){
            res.status(500).json({error: error.toString()});

        }
    })
module.exports = router;