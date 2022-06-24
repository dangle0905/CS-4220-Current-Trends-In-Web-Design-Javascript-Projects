//Question 1
console.log('1. Write a function called findMin.');

const findMin = (array) =>{
    let minNumber = 0;

    for (let index = 0; index < array.length; index++) {
        if (typeof array[index] === 'number'){
            if(array[index] < minNumber){
                minNumber = array[index]
            } 

        }
        
    } 

    return minNumber;

}
console.log(findMin([0, 100, 'hi', null, -1, 5, false]));
console.log();

//Question 2 
console.log('2. Write a function called halfNumberToArray.');

const halfNumberToArray = (number) =>{
    const array = [];
    let answer;

    
    //test to see if number is even or odd first
    if(number % 2 === 0){
        //number is even 
        answer = number / 2;
        array.push(answer);
        array.push(answer);
    }else{
        //number is odd
        answer = number / 2;
        array.push(Math.ceil(answer));
        array.push(Math.floor(answer));
        
    }

    return array;

}
console.log(halfNumberToArray(8));
console.log(halfNumberToArray(19));
console.log(halfNumberToArray(-19));
console.log();

//Question 3 
console.log('3. Write a function called countCharacters.');

const countCharacters = (aCharacter, aString) => {
    let count = 0;
    let upperCase = aCharacter.toUpperCase();
    let lowerCase = aCharacter.toLowerCase();
    for (let i = 0; i < aString.length; i++){
        if(aString.charAt(i) === upperCase || aString.charAt(i) === lowerCase ){
            count++;
        }
    }

    return count;
}

console.log(countCharacters('j', 'ES6 Javascript and Node.js'));
console.log(countCharacters('a', 'ES6 Javascript and Node.js.'));
console.log();

//Question 4
console.log('4. Write a function called findAndReplace.')

const findAndReplace = (replacementString, replaceTo, string) => {
    //note replace replaces first found char and replaceAll replaces all.
    let result = string.replaceAll(replacementString, replaceTo);
    return result;
}
console.log(findAndReplace('*', 'a', 'ES6 J*v*script *nd Node.js.'));
console.log();

//Question 5
console.log('5. Write a function called removeFalsey.')

const removeFalsey = (array) => {
    //filter old array and set results = that filer array
    let results = array.filter(Boolean);
    return results;

}
console.log(removeFalsey([8, false, '', 6, true, null, 7, 5, 0, 3]));
console.log();

//Question 6
console.log('6. Write a function called priorityUppercase.')

const priorityUppercase = (string) => {
    let strArr = string.split('')
    const uppercase = [];
    const lowercase = [];

    for (let i = 0; i < strArr.length; i++){
        //comparing ascii code in to letter. 65 - 90 is uppercase.
        if(string.charCodeAt(i) >= 65 && string.charCodeAt(i) <= 90){
            uppercase.push(strArr[i]);
        }else{
            lowercase.push(strArr[i]);
        }
    }
    const results = uppercase.concat(lowercase);

    return results;
}

console.log(priorityUppercase('javAsCriTp'));
console.log(priorityUppercase('apPliCaTIon'));
console.log();

//Question 7
console.log('7. Write a function called vowelPosition.');

const vowelPosition = (string) => {

    const lowerCaseString = string.toLowerCase();
    let index = 0;
    const vowelObj = {}
    const results = [];

    for (let letter of lowerCaseString){
        if (letter === 'a' || letter === 'e' || letter ==='i' || letter === 'o' || letter === 'u'){
            const vowelObj = {[letter]: index};
            results.push(vowelObj);
        }
        index++;
    }
    return results;
}

console.log(vowelPosition('ES6 Javascript and Node.js.'));
console.log();

//Question 8
console.log('8. Write a function called bucketObjectKeyValues.');

const bucketObjectKeyValues = (obj) => {

    let index = 0;
    const results = {};
    const arr = [];


    for (const key in obj){
        results[index] = Object.entries(obj)[index];
        index ++;

    }

    return results;

}

console.log(bucketObjectKeyValues({ Microsoft: 'Activision/Blizzard', Sony: 'Bungie', NYTimes: 'Wordle' }));
console.log(bucketObjectKeyValues({ Google: 'Play', Apple: 'Arcade' }));

let string = 'dangle';


let arrString = string.split('');

arrString.splice(0,1)

console.log(arrString);

