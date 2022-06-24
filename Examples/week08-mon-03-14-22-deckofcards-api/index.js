const superagent = require('superagent');

// a config file to hold our base URL (or any applicable API keys or authentication)
const config = require('./config.json');

const buildDeck = async (deckCount) => {
    try {
        const deckURL = `${config.url}/deck/new/shuffle/?deck_count=${deckCount}`;
        const response = await superagent.get(deckURL);
        console.log(response);
        return response.body;
    } catch (error) {
        return error;
    }
};

const drawCards = async (deckId, count) => {
    try {
        const drawURL = `${config.url}/deck/${deckId}/draw/?count=${count}`;
        const response = await superagent.get(drawURL);

        return response.body;
    } catch (error) {
        return error;
    }
};

// export the functions to be used in the cards-app CLI
module.exports = {
    buildDeck,
    drawCards
};
