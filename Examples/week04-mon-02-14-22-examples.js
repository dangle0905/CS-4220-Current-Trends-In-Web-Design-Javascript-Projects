/*
    Run this file by using the command: node <filename>.js
*/

// // --- Closure  -----------------------------------------------------------
const closureFn = () => {
    let counter = 0;

    return {
        setCounter: (value) => (counter = value),
        getCounter: () => counter,
        increment: () => ++counter,
        decrement: () => --counter
    };
};
const initCounter = closureFn();
console.log(initCounter.getCounter());
console.log(initCounter.setCounter(9));
console.log(initCounter.increment());
console.log(initCounter.increment());
console.log(initCounter.decrement());
console.log(initCounter.getCounter());

console.log('-----------------------');
const initCounter2 = closureFn();
console.log(initCounter2.getCounter());

// --- Built In Prototypes  --------------------------------------------------
console.log(Object.getOwnPropertyNames(Object.prototype));
console.log(Object.getOwnPropertyNames(Array.prototype));
console.log(Object.getOwnPropertyNames(Function.prototype));
console.log(Object.getOwnPropertyNames(String.prototype));

// --- ES6 Classes ----------------------------------------------------------
// ES6 Classes only creates syntactical sugar to writing classes
// ES6 Classes are still prototype based
class Penguin {
    constructor(type) {
        this.type = type;
    }

    greet(greeting) {
        return `This ${this.type} penguin says ${greeting}`;
    }

    fact() {
        return 'All penguins have knees.';
    }
}
const firstPenguin = new Penguin('adelie');
console.log(firstPenguin.greet('hello'));

class Emperor extends Penguin {
    constructor(type) {
        super(type);
    }

    fact(n) {
        return `On avg. the ${this.type} stands about 4ft tall and weighs 100 lbs.`;
    }
}
const secondPenguin = new Emperor('emperor');
console.log(secondPenguin.greet('hi'));
console.log(secondPenguin.fact());

// --- Dangers of Prototypes - DO NOT TOUCH built-in attributes/properties on the Prototype
// Array.prototype.pop = function () {
//     return 'not popping';
// };
// const arr = [1, 2, 3];
// console.log(arr.pop());
// console.log(arr);

// --- ES6 Class with dot Chaining  -----------------------------------------
// TODO on Wednesday.
