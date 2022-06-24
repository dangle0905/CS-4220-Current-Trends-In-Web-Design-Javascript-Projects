/*
    Run this file by using the command: node <filename>.js
*/

// // --- Object & Array Spreading | Object Destructuring ------------------------------
const transformer = {
    name: 'Optimus Prime',
    team: 'Autobots',
    colors: ['red', 'blue', 'silver'],
    members: ['Bumblebee', 'Ironhide']
};

const printTransformer = (transformer) => {
    // object destructuring with default values
    const { name, team, colors, members, type = 'car', weaponry = 'none' } = transformer;

    console.log('name:', name);
    console.log('team:', team);
    console.log('colors:', colors);
    console.log('members:', members);
    console.log('type:', type);
    console.log('weaponry:', weaponry);
};
console.log('Original transformers with object destructuring')
printTransformer(transformer);
console.log();

// object spreading - merging in a new key/value pair
const updatedTransformer = { ...transformer, type: 'truck', weaponry: 'sword' };
// array spreading - adding in new values to the existing array
updatedTransformer.members = [...updatedTransformer.members, 'Ratchet', 'Jazz'];
console.log('Updated transformers')
printTransformer(updatedTransformer);
console.log();


// // --- Higher Order Functions  ----------------------------------------
console.log('Higher Order Functions')
const repeat = (arr, action) => {
    for (let i = 0; i < arr.length; i++) {
        const n = arr[i];
        action(i, n);
    }
};
repeat([1, 2, 3], console.log);
console.log()


// // --- Array forEach  -------------------------------------------------
console.log('Array For each')
const arrForEach = (letters) => {
    const letterArr = [];
    letters.forEach((letter, index) => {
        letter.upper = letter.lower.toUpperCase();
        letter.position = index;

        letterArr.push(letter);
    });

    return letterArr;
};
const letters = [{ lower: 'a' }, { lower: 'b' }, { lower: 'c' }];
console.log('for each letters')
console.log(arrForEach(letters));
console.log()



// // --- Array .map()  --------------------------------------------------
const arrMap = (letters) => {
    const results = letters.map((letter, index) => {
        return { ...letter, upper: letter.lower.toUpperCase(), index};
    });

    return results;
};


const lettersV2 = [{ lower: 'a' }, { lower: 'b' }, { lower: 'c' }];

console.log('for each lettersV2')
console.log(arrMap(lettersV2));
console.log()




// // --- Array .filter()  ------------------------------------------------
const arrFilter = (mixed) => {
    const results = mixed.filter((letter) => {
        if (letter === letter.toUpperCase()) {
            return letter;
        }
    });

    return results;
};
const mixedLetters = ['N', 's', 'O', 'k', 'l', 'D', 'q', 'E', 'J', 'j', 'S'];
console.log(arrFilter(mixedLetters));

// // --- Array .sort()  -------------------------------------------------
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
const companies = [
    { name: 'Google', founded: 1998 },
    { name: 'Tesla', founded: 2003 },
    { name: 'Apple', founded: 1976 },
    { name: 'Microsoft', founded: 1975 }
];
const arrSortByString = (arr) => {
    return arr.sort((a, b) => {
        const upperA = a.name.toUpperCase();
        const upperB = b.name.toUpperCase();

        if (upperA < upperB) {
            // sort a before b
            return -1;
        } else if (upperA > upperB) {
            // sort b before a
            return 1;
        } else {
            // name must be equal and keep order of a and be
            return 0;
        }
    });
};
console.log(arrSortByString(companies));

const arrSortByNumber = (arr) => {
    return arr.sort((a, b) => a.founded - b.founded);
};
console.log(arrSortByNumber(companies));
