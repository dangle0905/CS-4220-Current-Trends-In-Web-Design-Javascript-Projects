/*
    Run this file by using the command: node examples.js
*/

// // --- Variable Scoping  ----------------------------------
// if (true) {
//     const str = 'inside the code block';
//     console.log(str);
// }
// this console.log is expect to produce an error
// console.log(str);


// // --- Issues when not Variable Scoping properly  ----------------------------------
// let number;
// for (number = 1; number < 10; number++) {
//     console.log('for loop', number);
// }

// the variable number already incremented to 10
// so this while loop conditional evaluates to false
// this an example of improper scoping and variable leaking into other code block
// while (number < 10) {
//     console.log('while loop', number);
//     number++;
// }

// // // --- if Conditional  ----------------------------------
function simpleConditional() {
    const n = 10;

    if (typeof n === 'number') {
        const square = n * n;
        console.log(square);
    }
}
simpleConditional();

// // // --- if/else if/else Conditional  ----------------------------------
function complexConditional() {
    const unknown = 'xyz';

    if (typeof unknown === 'string') {
        console.log(unknown, 'is type of string');
    } else if (typeof unknown === 'number') {
        console.log(unknown, 'is type of number');
    } else {
        console.log(unknown, 'is not type of string or number');
    }
}
complexConditional();

// // // --- Ternary Conditional  ----------------------------------
function getH2OState(degreesCelsius) {
    // conditional ? true : false
    return degreesCelsius > 0 ? 'liquid' : 'solid';
}
console.log(getH2OState(-2));

// // // --- While Loop  ----------------------------------
function runWhile() {
    let number = 1;
    while (number < 10) {
        console.log(number);
        number++;
    }
}
runWhile();

// // // --- For Loop  ----------------------------------
function runForLoop() {
    for (let number = 1; number < 10; number++) {
        console.log(number);
    }
}
runForLoop();


// // // --- Function Declaration Notation  ----------------------------------
function simpleCalc(n1, n2, operator) {
    if (typeof n1 !== 'number' || typeof n2 !== 'number') {
        return 'Error: n1 and n2 must be numbers';
    }

    if (operator === '+') {
        return n1 + n2;
    } else if (operator === '-') {
        return n1 - n2;
    } else if (operator === '*' || operator === 'x') {
        return n1 * n2;
    } else if (operator === '/') {
        return n1 / n2;
    } else {
        return 'Error: unrecognized operator';
    }
}
console.log(simpleCalc(4, 5, '/'));