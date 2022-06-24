// to start with nodemon from the package.json
// on OsX or Linux use: npm run start
// on Windows use: npm run windows


const cors = require('cors');
const express = require('express');

//connects to mongodb database
const MongoClient = require('mongodb').MongoClient;

const config = require('./config.json');

// requiring in the router handler file for snippets
const snippets = require('./snippets');

// require in the router handle file for users
const users = require('./users');

// calling express fn which creates the express application
// this allows use to use the ful functionality for our express server
const app = express();
const port = 8888;

// apply middleware to the application level
// middleware parse various POST JSON bodies in express
app.use(cors());
app.use(express.json());
// add app level here

// GET route to handle localhost:8888
app.get('/', (req, res) => {
    res.send('Welcome to the Snippets Application That uses Mongo DB');
});

// add the snippets route to the express application
// our express app will no be able to handle requests to /snippets
app.use('/snippets', snippets);

// add the users route to the express application
// our express app will no be able to handle requests to /users
app.use('/users', users);

//mongodb+srv://dbAdmin:<password>@cluster0.50om5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const url = `mongodb+srv://${config.username}:${config.password}@${config.cluster}/${config.database}?retryWrites=true&w=majority`;

// create a new mongo client instance
const client = new MongoClient(url);

// connect ot the url provided
client.connect((err) => {
    // if there is an error then throw because our server depends on our database
    if (err) {
        throw new Error('Failed to connect to MongoDB');
    }

    console.log('Connected to MongoDB');

    // storing the database instace in the app.locals object to reference in user.js and snippets.js
    app.locals.db = client.db();

    // start the server after connecting to mongo
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
});
