/*
    Run this file by using the command: node <filename>.js
*/

// // --- Array Methods Cont.  ------------------------------
// const arrayMethods = () => {
//     const nums = [8, 99, 7, 1];

//     // sort
//     const sorted = nums.sort();
//     console.log(sorted);

//     // reverse
//     const reversed = nums.reverse();
//     console.log(reversed);

//     // concat
//     const moreNums = [3, 0, 9];
//     const combined = nums.concat(moreNums);

//     console.log(combined);
// };
// arrayMethods();

// --- Objects  ------------------------------------------
// const objectLiteral = () => {
//     const transformer = {
//         name: 'Optimus Prime',
//         team: 'Autobots',
//         colors: ['red', 'blue', 'silver'],
//     };

//     //access a property using dot notation
//     console.log(transformer.name);

//     // access a property using bracket notation w/ string
//     console.log(transformer['name']);

//     //add a key using dot notation
//     transformer.homeWorld = 'Cybertron';

//     // add a key using bracket notation w/ variable
//     const type = 'vehicle';
//     transformer[type] = 'truck';

//     // delete a key using dot notation
//     delete transformer.homeWorld;

//     // delete a key using bracket notation w/ variable
//     delete transformer[type];

//     console.log(transformer);
// };
// objectLiteral();

// // -- Object Methods  ------------------------------------
const objectMethods = () => {
    const course = {
        department: 'Computer Science',
        number: 4220,
        startTime: '6:00pm',
    };

    // Object.assign
    Object.assign(course, { endTime: '7:15pm' });

    // using a variable to create a key
    const courseRoom = 'room';
    Object.assign(course, { [courseRoom]: 'Zoom' });

    // Object.assign with short hand notation
    const year = 2022;
    const semester = 'Spring';
    Object.assign(course, { year, semester });
    console.log(course);

    // entries
    const entries = Object.entries(course);
    console.log(entries);

    // keys
    const keys = Object.keys(course);
    console.log(keys);

    // values
    const values = Object.values(course);
    console.log(values);
};
objectMethods();

/*
EXAMPLE PROBLEM
-   Write a function called convertToArray.
-   The convertToArray function takes an object as an argument and returns a 2D array.
-   Each key, value pair in the object should be added to an array where the
    first item is the key and the second is the value. These key/value pair arrays should
    then be added to an array and returned.
-   DO NOT use Object.entries()

    convertToArray({
        developer: 'Respawn',
        producer: 'EA',
        game: 'Star Wars Jedi: Fallen Order',
        year: 2019,
    })
    EXPECTED OUTPUT (array):
    [
        [ 'developer', 'Respawn' ],
        [ 'producer', 'EA' ],
        [ 'game', 'Star Wars Jedi: Fallen Order' ],
        [ 'year', 2019 ]
    ]
*/

// const convertToArray = (obj) => {
//     // declare an array to hold the key/value pairings
//     const gameArr = [];

//     // loop through the object being passing in
//     // for the key in obj
//     for (const key in obj) {
//         // on each iteration declare a new array to hold the [key, value] pair
//         const pairing = [];

//         // push in the key of the object
//         pairing.push(key); // first iteration: ['developer']

//         // push in the value of that key in the object
//         pairing.push(obj[key]); // first iteration: ['developer', 'Respawn']

//         // push the pairs into the main array
//         gameArr.push(pairing); // first iteration: [ ['developer', 'Respawn']]
//     }

//     // return the 2D array
//     return gameArr;
// };

// const answer = convertToArray({
//     developer: 'Respawn',
//     producer: 'EA',
//     game: 'Star Wars Jedi: Fallen Order',
//     year: 2019,
// });
// console.log(answer);
