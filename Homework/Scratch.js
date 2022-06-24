const makeBreakfast = (hungry, callback) => {
    const food = hungry ? 'pancakes' : 'coffee';

    setTimeout(()=>{
        callback(null, {food});
    },1 );
};

const startDay = (isHungry) => {

    makeBreakfast(isHungry, (error, success)=>{
        const {food} = success;

        console.log('Having ${food} for breakfast');
    });
};

startDay(false);
