// in-memory data storage
// data added this will only persist data for as long as the server in running
//results is a key that has an array as a value, in the array is a object
const mockDB = {
    results: [
        {
            id: 1,
            author: 'auman',
            language: 'javascript',
            title: 'JavaScript Ternary',
            code: "// condition ? truthyValue : falseyValue \n const num = 1; \n const evaluteNum = (n % 2 == 0) ? 'even' : 'odd' \n console.log(evaluteNum);"
        }
    ]
};

module.exports = mockDB;
