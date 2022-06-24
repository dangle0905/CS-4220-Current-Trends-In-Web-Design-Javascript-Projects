const router = require('express').Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('./config.json');
const collection = require('./mock_db/user_collection');

// first the user must be registered
router.post('/register', async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;

        // gen salt which changes each time the function is called
        const salt = await bcrypt.genSalt();
        // use the password + salt to create a hashed password
        const hashed = await bcrypt.hash(password, salt);

        // LAB # 1 & LAB # 2

        if( password !== confirmPassword){
            res.status(409).json({ error: "Password and Confirm Password do not match"});
        
        //if password and confirm password is equal and we can't find a username already in database
        //then we can create a new user
        }else if(password === confirmPassword && (collection.get(username)=== undefined)){

            //success status code 200
            res.status(200).json({ success: true });
            // add user to the users collection in the mock database
            //username and password hashed
            collection.add({ username, password: hashed });

        }else{
            res.status(409).json({ error: "User " + username + " is already registered."});
        }


        

        
    } catch (error) {
        
        res.status(500).json({ error: error.toString() });
    }
});

// second the user can now login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // get user by username from the users collection in the mock database
        const user = collection.get(username);

        // LAB # 3
        if (user === undefined){
            res.status(403).json({error: "User "+ username + " is not registered."});
        }else{
            // authenticate the user
            // use bcrypt to compare there password from POST and the one stored in the mack db match
            const authenticated = await bcrypt.compare(password, user.password);

            if (authenticated) {
                // sign a token by passing in the data to be signed and the secret
                // the data that is signed is accessible in the verifyAccessToken middleware in snippet.js
                const token = jwt.sign({ username }, config.jwt_secret);

                // return the username and token to the client
                res.status(200).json({ username, token });
            } else {
                // if not authenticated then respond with 401 Unauthorized
                res.status(401).json({ error: `Failed to authenticate ${username}` });
            }
        }

        
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

module.exports = router;
