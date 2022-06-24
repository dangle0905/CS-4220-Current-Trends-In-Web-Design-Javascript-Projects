const breakfastMenu = {
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

const cook = (order) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            return resolve({ ready: order.food });
        }, order.time);
    });
};

const placeOrder = (menu, item) => {
    return new Promise((resolve, reject) => {
        if (menu[item]) {
            return resolve(menu[item]);
        } else {
            return reject({ failed: `${item} is not on the menu` });
        }
    });
};

const getTakeOut = async (menu, item) => {
    try {
        const order = await placeOrder(menu, item);
        const food = await cook(order);

        console.log(`${food.ready} for breakfast`);
    } catch (error) {
        console.log(error.failed);
    }
};

getTakeOut(breakfastMenu, 'southern_comfort');
getTakeOut(breakfastMenu, 'quick_and_easy');
getTakeOut(breakfastMenu, 'cheeseburger');
