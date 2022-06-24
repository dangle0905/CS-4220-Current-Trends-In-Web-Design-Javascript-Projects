// to start with nodemon from the package.json
// on OsX or Linux use: npm run start
// on Windows use: npm run windows
const cors = require('cors');
const express = require('express');

// requiring in the router handler file
const snippets = require('./snippets');

// calling express fn which creates the express application
// this allows use to use the ful functionality for our express server
const app = express();
const port = 8888;

// apply middleware to the application level
// middleware parse various POST JSON bodies in express
app.use(cors());
app.use(express.json());

// GET route to handle localhost:8888
app.get('/', (req, res) => {
    res.send('Welcome to the Snippets Application');
});

// add the snippets route to the express application
// our express app will no be able to handle requests to /snippets
app.use('/snippets', snippets);

// start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
