
// // --- Function Declaration vs Function Expressions  ---

// function declaration allows to call the function before defining
// this however is not considered a best practice
// when using function function declaration always defined the function and then call it
// declaration();
// function declaration() {
//     console.log('call this from anywhere?');
// };

// // function expression is best practice because
// // you must first defined the function and then call the function
// const expression = function () {
//     console.log('call this from anywhere too?');
// };
// expression();


// // --- Function Expression  -----------------------------
const add = function (a, b) {
    return a + b;
};
console.log(add(5, 5));

// using default values in function arguments
const multiply = function (a = 1, b = 2) {
    return a * b;
};
console.log(multiply(8)); // 16
console.log(multiply(8, 8)); // 64


// // --- Arrow Functions  ---------------------------------
const addArrow = (a, b) => {
    return a + b;
};
console.log(addArrow(1, 2));

// if a function has a return statement after the first curly
// it can be condensed into a single line function
const addArrowSimple = (a, b) => a + b;
console.log(addArrowSimple(2, 3));


// // --- String Template Literal  -------------------------
const templateLiteral = (name) => {
    const greeting = `Hello ${name}`;

    console.log(greeting);
};
templateLiteral('World');

const templateLiteralTernary = (degreeC) => {
    console.log(`H20 is a ${degreeC > 0 ? 'liquid' : 'solid'} at ${degreeC}° C`);
};
templateLiteralTernary(2);


// // --- String Methods  ----------------------------------
const stringMethods = () => {
    const csv = 'hi,hello,hey,yo';

    //split
    const splitting = csv.split(',');
    console.log(splitting);


    const greeting = 'Hello World';

    // casing
    const upper = greeting.toUpperCase();
    const lower = greeting.toLowerCase();

    console.log(`Uppercase: ${upper}`);
    console.log(`Lowercase: ${lower}`);

    // includes
    const strIncludes = greeting.includes('ello');
    console.log(strIncludes);

    // charAt
    const letter = greeting.charAt(0);
    console.log(letter);
};
stringMethods();;


// // --- Arrays  ------------------------------------------
const arr = () => {
    const mixed = ['a', 1, true, null];
    for (let i = 0; i < mixed.length; i++) {
        console.log(mixed[i]);
    }
};
arr();


// // --- Array Methods  ----------------------------------
const arrayMethods = () => {
    const planets = ['venus', 'earth', 'mars'];

    planets.push('jupiter');
    planets.push('saturn', 'uranus', 'neptune', 'pluto');
    console.log(planets);

    // pop
    const last = planets.pop();
    console.log(last);
    console.log(planets);


    // unshift
    planets.unshift('mercury');
    console.log(planets);

    planets.unshift('sun');
    console.log(planets);


    // shift
    const first = planets.shift();
    console.log(first);
    console.log(planets);

    const joinPlanets = planets.join(',');
    console.log(joinPlanets);

    // includes
    const hasEarth = planets.includes('earth');
    console.log(hasEarth);

};
arrayMethods();