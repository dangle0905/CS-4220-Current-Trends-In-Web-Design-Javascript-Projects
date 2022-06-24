const menu = {
    quick_and_easy: {
        food: 'cereal and milk',
        time: 0
    },
    tall_stack: {
        food: '5 pancakes w/ maple syrup',
        time: 200
    },
    scrambler: {
        food: '2 scrambled eggs w/ bacon',
        time: 400
    },
    southern_comfort: {
        food: 'biscuits n gravy',
        time: 900
    }
};

const cook = (order, callback) => {
    // setTimeout out will execute the function after the specified time in ms has elapsed
    setTimeout(() => {
        // success condition
        if (order.food) {
            callback(null, { ready: order.food });
        }
        // error condition
        else {
            callback({ failed: 'item not on menu' }, null);
        }
    }, order.time);
};

const placeOrder = (order = {}) => {
    // call the cook function - pass in the order object and a callback function
    cook(order, (error, success) => {
        // success condition
        if (!error) {
            console.log(`${success.ready} for breakfast`);
        }
        // error condition
        else {
            console.log(error.failed);
        }
    });
};

placeOrder(menu.southern_comfort);
placeOrder(menu.quick_and_easy);
placeOrder(menu.cheeseburger); // this will callback with the error
