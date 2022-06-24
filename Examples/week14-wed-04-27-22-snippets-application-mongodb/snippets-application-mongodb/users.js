const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

const config = require('./config.json');

// POST /users/register to register a new account on snippets app
router.post('/register', async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;

        // LAB # 1
        if (password !== confirmPassword) {
            // 409 status code means Conflict
            res.status(409).json({
                error: 'Password and Confirm Password do not match.'
            });
        } else {
            // LAB # 2
            const db = req.app.locals.db;
            const collection = db.collection('Users');

            // collation allows users to specify language specific rules for comparison
            // use strength: 1 which compares base characters as case insensitive
            // user Snoopy and snoopy are the same - unique name is case insensitive
            const user = await collection
                .find({ username }, { collation: { locale: 'en', strength: 1 } })
                .next();

            if (!user) {
                // gen salt which changes each time the function is called
                const salt = await bcrypt.genSalt();
                // use the password + salt to create a hashed password
                const hashed = await bcrypt.hash(password, salt);

                // insert one user that includes the username and password
                await collection.insertOne({ username, password: hashed });

                // respond with a 201 and that the user has been created successfully
                res.status(201).json({ registered: true });
            } else {
                // 409 status code means Conflict
                res.status(409).json({
                    error: `Username ${username} is already registered.`
                });
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// POST /users/login to login to an account on snippets app after registering
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const db = req.app.locals.db;
        const collection = db.collection('Users');

        // collation allows users to specify language specific rules for comparison
        // use strength: 1 which compares base characters as case insensitive
        // user Snoopy and snoopy are the same - unique name is case insensitive
        const user = await collection
            .find({ username }, { collation: { locale: 'en', strength: 1 } })
            .next();

        // LAB # 3
        if (user) {
            // authenticate the user
            // use bcrypt to compare the password from POST and the one stored in the mack db match
            const authenticated = await bcrypt.compare(password, user.password);

            if (authenticated) {
                const token = jwt.sign({ username: user.username }, config.secret);
                // return the username and jwt if that user was authenticated
                res.json({ username: user.username, token });
            } else {
                res.status(401).json({ error: `Failed to authenticate ${username}` });
            }
        } else {
            // 404 status code means Not Found
            res.status(404).json({ error: `Username ${username} is not registered.` });
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

module.exports = router;
