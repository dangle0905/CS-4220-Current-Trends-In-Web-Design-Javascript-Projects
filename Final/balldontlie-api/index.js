const superagent = require('superagent');

// a config file to hold our base URL (or any applicable API keys or authentication)
const config = require('./config.json');

const searchPlayers = async (name) => {

    try {

        if (name===undefined){
            const searchResults = `${config.url}api/v1/players`;
            const response = await superagent.get(searchResults);
            return response.body;
        }else{
            const searchResults = `${config.url}api/v1/players?search=${name}`;
            const response = await superagent.get(searchResults);
            return response.body;

        }
        


    } catch (error) {
        return error;
    }
};

const searchID = async (number) => {

    try {

            

            const searchResults = `${config.url}api/v1/players/${number}`;
            const response = await superagent.get(searchResults);
            return response.body;

    } catch (error) {
        return error;
    }
};





// export the functions to be used in the cards-app CLI
module.exports = {
    searchPlayers,
    searchID,
};

/*
https://www.balldontlie.io/#introduction
SEARCHING - https://www.balldontlie.io/api/v1/players?search=james&per_page=100
DATA GET/FETCH - https://www.balldontlie.io/api/v1/players/237
No API key required
*/