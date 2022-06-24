console.log('1. Write a function called filterAndSortEvents()')

const filterAndSortEvents = (objs, aString) => {
    //called the sort method that takes our compareNumber function
    objs.sort(compareNumbers);
    
    //sort the year from lowest to highest
    function compareNumbers(a, b){
        return a.year - b.year;
    }

    //filter returns a new filter array with our own custom code
    //filter will iterate thru each objects what we are trying to find is by year so
    //we use object.year to do that
    const objResults = objs.filter(objects => {
        if(aString === '1600s' && objects.year >= 1600 && objects.year <= 1699){
            return objects;
        }else if (aString === '1700s' && objects.year >= 1700 && objects.year <= 1799){
            return objects;
        }else if (aString === '1800s' && objects.year >= 1800 && objects.year <= 1899){
            return objects;
        }else if (aString === '1900s' && objects.year >= 1900 && objects.year <= 1999){
            return objects;
        }
    })

    //this is an array of objects filter out that is going to be returned
    return objResults;
    
}

const arrOfObjs = [{ discovery: 'Saturn Rings', year: 1656 },
                    { discovery: 'Electric Battery', year: 1800 },
                    { discovery: 'Galileo Observes Moon', year: 1609 },
                    { discovery: 'Speed of Light', year: 1676 },
                    { discovery: 'Periodic Table', year: 1869 },
                    { discovery: 'Chromosomes', year: 1943 }];

console.log(filterAndSortEvents(arrOfObjs, '1600s'));
console.log();

console.log('2. Write a function called mapCharacters()')

function mapCharacters(arrObjs){

    const heroes = arrObjs.map(
        //character is the object in each index
        character => {

        //this for statement iterates thru the obj and retrieves the key and values of the character
        for (const [key, value] of Object.entries(character)){
            if(value === 'age' && !isNaN(parseInt(key))){
                character.age = parseInt(key);
            }else if (value === 'age' && isNaN(key)){
                character.age = 'unknown';
            }
        }

        //if the character is a hero we return with hero property else we return with villain property
        if(character.isHero === true ){
            return {hero: character.name, age: character.age}
        }else{
            return {villain: character.name, age: character.age}
        }
        }

    );


    return heroes;

}

const arrOfCharacters = [
    { name: 'Spider-Man', isHero: true, '28': 'age'},
    { name: 'Thor', isHero: true, '1500': 'age' },
    { name: 'Black Panther', isHero: true, '35': 'age' },
    { name: 'Loki', isHero: false, '1054': 'age' },
    { name: 'Venom', isHero: false, 'unknown': 'age' }
];

console.log(mapCharacters(arrOfCharacters));
console.log();



const google = {
    site: 'google.com',
    dataSize: 1,
    responseTime: 0
};

const reddit = {
    site: 'reddit.com',
    dataSize: 200,
    responseTime: null
};

const github = {
    site: 'github.com',
    dataSize: 500,
    responseTime: 50
};

const openWebsiteCallbacks = (websiteObj = {}) => {

    //at first it will only take in website object as it calls scrap data callbacks even though it takes two parameters
    scrapDataCallbacks(websiteObj, (error, success) => {
        
        if (!error) {
            console.log(`Scrapped ${success.dataSize} mb from ${success.webSite}`);
        }
        // error condition
        else{
            console.log(error.failed);
        }

        
    });

    
}

//scarp data take two parameters 
const scrapDataCallbacks = (websiteObj, callback) => {

    //set time out function takes a function and number (time in ms)
    setTimeout(()=>{
        //if the response time is not null that it is a success condition 
        if (!(websiteObj.responseTime === null)){ 
            //success condition
            callback(null, {dataSize: websiteObj.dataSize, webSite: websiteObj.site})
        }else {
            callback({ failed: websiteObj.site + ' is down' }, null);
        }
    //this is the time that will elapse
    }, websiteObj.responseTime);
}

setTimeout(()=>{
    console.log('3. Using error-first callbacks syntax write a set of functions that attempts to scrap websites for data.');
    console.log();
    openWebsiteCallbacks(google);
    openWebsiteCallbacks(reddit);
    openWebsiteCallbacks(github);
}, 1000);


const openWebsitePromises = (websiteObj) => {
    
    return new Promise((resolve, reject) => {
        if (!(websiteObj.responseTime===null)) {
            return resolve(`Scrapped ${websiteObj.dataSize} mb from ${websiteObj.site}`);
        } else {
            return reject(`${websiteObj.site} is down.`);
        }

    });
};

const scrapDataPromises=(websiteObj)=>{
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve(websiteObj);
        }, websiteObj.responseTime);
    });
};

setTimeout(() =>{
    console.log();
    console.log('4. Using Promises syntax with the .then() and .catch()  write a set of functions that attempts to scrap websites for data.');
    console.log();
    openWebsitePromises(google)
        //then takes one parameter we name 'message' that takes what is return from resolve in openWebsitePromises 
        //then calls scrapDataPromises and passes that same resolve in scrapDataPromises which then 
        //calls a setTimeOut
        .then((message) => scrapDataPromises(message))
        .then((message) => {
            console.log(message)
        })
        .catch((error)=>{
            console.log(error);
        });


    openWebsitePromises(reddit)
        .then((success) => scrapDataPromises(success))
        .then((message) => {
            console.log(message)
        })
        .catch((error)=>{
            console.log(error);
        });

    openWebsitePromises(github)
        .then((success) => scrapDataPromises(success))
        .then((message) => {
            console.log(message)
        })
        .catch((error)=>{
            console.log(error);
        });
        
},2000);

const asyncAwaitWebSiteScraps = async (websiteObj) => {
    try {
        const open = await openWebsitePromises(websiteObj);
        const scrap = await scrapDataPromises(websiteObj);

        console.log(`Scrapped ${websiteObj.dataSize} mb from ${websiteObj.site}`);
    } catch (error) {
        console.log(error);
    }
};

setTimeout(()=>{
    console.log();
    console.log('5. Using Async/Await syntax that interact with the previous Promise functions that attempts to scrap websites for data.');
    console.log();
    asyncAwaitWebSiteScraps(google);
    asyncAwaitWebSiteScraps(reddit);
    asyncAwaitWebSiteScraps(github);

},3000);




