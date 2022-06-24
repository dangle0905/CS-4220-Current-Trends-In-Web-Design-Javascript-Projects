// to start with nodemon from the package.json
// use: npm run start or npm start
const express = require('express');

// calling express fn which creates the express application
// this allows use to use the ful functionality for our express server
const app = express();
const port = 8888;

// create a get route to handle main site localhost:8888
app.get('/', (req, res) => {
    const { url, method, headers } = req;
    console.log(url, method, headers);

    res.send('hello world!');
});

// a get route to localhost:8888/json with a JSON response
app.get('/json', (req, res) => {
    const { query } = req;
    console.log(query);

    res.json({ hello: 'world' });
});

// start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
