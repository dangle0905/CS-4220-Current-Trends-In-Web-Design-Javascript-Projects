// Build in class with inquirer and using deck.js
const inquirer = require('inquirer');

const deck = require('./deck.js');

// helper functions for printing
const _print = (result) => {
    result.drawn.forEach((card) => {
        console.log(`${card.value} of ${card.suit}`);
    });
    console.log(`Remaining Cards: ${result.remaining}`);
};

// prompt the user by asking a Yes/No question to draw another card
const _anotherCardPrompt = () => {
    // inquirer returns a promise
    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'card',
            message: 'Would you like to draw another card?'
        }
    ]);
};

// the draw which contains our program logic
// handles getting a deck from deck.js, shuffling, drawing a card, and prompting user
const draw = async (args) => {
    const { shuffle } = args;

    // get a deck of cards
    let deckOfCards = deck.buildDeck();

    // optionally shuffle the deck of cards based on user input
    if (shuffle) {
        deckOfCards = deck.shuffleDeck(deckOfCards.cards);
        console.log('This card is being shuffled');
    }else{
        console.log('This card is not being shuffled');
    }

    // draw a card
    const numberOfCards = 2;
    const drawnCard = deck.drawCards(deckOfCards.cards, numberOfCards);
    _print(drawnCard);

    // prompt user to draw another card
    // _anotherCardPrompt uses inquirer which returns a Promise
    // we must await the user interaction before the program can move forward
    const drawAnother = await _anotherCardPrompt();

    // if the user selects Y then draw another and print
    if (drawAnother.card) {
        const anotherCard = deck.drawCards(drawnCard.cards, 1);
        _print(anotherCard);
    }
};

// export the function to be used in another file
module.exports = {
    draw
};
