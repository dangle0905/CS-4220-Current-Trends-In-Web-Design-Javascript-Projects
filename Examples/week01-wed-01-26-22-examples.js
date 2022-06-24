/*
    Run this file by using the command: node examples.js

*/

// --- Logging to the console and Comments ----------------------------------

// console.log('hello');
// console.log('hello' + ' ' + 'world');
// console.log('hello', 'world');
// console.log(1);
// console.log(1 + 1);
// console.log(false);
// console.log(null);
// console.log(undefined);

// // // --- Declarations (let vs const) ---------------------------------------
// const hello = 'hello';
// console.log(hello);

// let count = 1;
// count++;
// console.log(count);

// let hey = 'hey';
// hey = 'hello';
// console.log(hey);

// // // --- Setting Empty -----------------------------------------------------
// let x;
// console.log(x);
// x = null;
// console.log(x);
// x = 1;
// console.log(x);

// // // --- Comparison Operators ----------------------------------------------
// // Double Equals
// console.log('2' == 2);
// console.log(false == 0);
// console.log(undefined == null);

// // Triple Equals
// console.log('2' === 2);
// console.log(false === 0);
// console.log(undefined === null);

// console.log(2 > 1);
// console.log(2 >= 2);
// console.log(1 < 2);

// // // --- Unary Operators ---------------------------------------------------
// // typeof
// console.log(typeof 'CS4220');
// console.log(typeof 2021);

// // ++ (increment)
// let a = 7;
// a++;
// console.log(a);

// // -- (decrement)
// let b = 7;
// b--;
// b--;
// console.log(b);

// // // --- Logical Operators -------------------------------------------------
// // &&
// console.log(true && true); // true
// console.log(true && false); // false

// // ||
// const value = 10;
// console.log(value || 5);

// // !
// console.log(!true);
// console.log(!false);

// // // --- Type Coercion -------------------------------------------------

// // Implicit coercion
// const n1 = '7';
// const n2 = 8;
// const sum = n1 + n2;
// console.log(typeof sum);
// console.log(sum);

// // Implicit coercion
// const n3 = '7';
// const n4 = 8;
// const sum = n3 * n4;
// console.log(typeof sum);
// console.log(sum);

// // Explicit coercion
// const n5 = 9;
// const goToString = n5.toString();
// console.log(typeof goToString);
// console.log(goToString);

// // // --- Conditional and Indentation ---------------------------------------
// const number = 3;

// if (true) {
//     if (number === 1) {
//         console.log('print number is 1');
//     } else if (number === 2) {
//         console.log('print number is 2');
//     } else {
//         console.log('print number is', number);
//     }
// }