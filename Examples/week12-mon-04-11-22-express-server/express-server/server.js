// to start with nodemon from the package.json
// use: npm run start or npm start
const express = require('express');

// calling express fn which creates the express application
// this allows use to use the ful functionality for our express server
const app = express();
const port = 8888;

// middleware parse various POST JSON bodies in express
app.use(express.json());

// GET route to localhost:8888
app.get('/', (req, res) => {
    const { url, method, headers } = req;
    console.log(url, method, headers);

    console.log("this is the responds", res);

    //second argument "*" allow any users to access our servers
    res.header('Access-Control-Allow-Origin', '*');
    res.send('this is the get request with "/" endpoint.');
});

// GET route to localhost:8888/json with a JSON response
// handle returning some json data
//http://localhost:8888/json?search=hello&page=2
//try that and query will now not be epy but contain search = hello, page = 2
app.get('/json', (req, res) => {
    //query is the top part of url "searching"
    const { query } = req;
    console.log("this is the query ", query);

    res.json({ hello: 'world' });
});

// POST route to localhost:8888/json which accepts JSON and returns a JSON response

app.post('/json', (req, res) => {
    //body is the body of the html sent thru..request are coming from body of page
    const { body } = req;

    console.log("this is the typeof body", typeof body);
    console.log("this is the body", body);
    res.json({ success: true });
});

// using all method create a route that will handle all http verbs and all requests not implemented
// return 404 status code and not found message
app.all('*', (req, res) => {
    res.status(404).send('Error: 404. Page not Found.');
});

// start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
