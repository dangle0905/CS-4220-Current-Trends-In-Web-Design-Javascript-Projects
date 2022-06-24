/* eslint-disable camelcase */
// Build in class with inquirer and using deck.js
const inquirer = require('inquirer');

// require in the custom deck of cards module use the module name (aka the name inside the package.json)
const deck = require('deckofcards-api');

// helper functions for printing
const _print = (person, cards, remaining, total) => {
    console.log('- - - - - - - - - - - - - - - - - - - - -');
    console.log(`${person} Shows:`);
    cards.forEach((card) => {
        console.log(`${card.value} of ${card.suit}`);
    });
    console.log(`Hand Total ${total}`);
    console.log('- - - - - - - - - - - - - - - - - - - - -');
    console.log(`Remaining Cards: ${remaining}`);
    console.log('- - - - - - - - - - - - - - - - - - - - - \n');
};

const _calculateHand = (cards) => {
    const tens = ['KING', 'QUEEN', 'JACK'];
    const ace = 'ACE';

    let total = 0;

    cards.forEach((card) => {
        if (card.value === ace) {
            total += 11;
        } else if (tens.includes(card.value)) {
            total += 10;
        } else {
            total += parseInt(card.value);
        }
    });

    return total;
};

const _drawPrompt = async () => {
    // the choices in 21 are called:
    // hit which means to draw again and stay which means to not draw

    // inquirer prompt displays user friendly text BUT returns the value associated to the text
    const terms = [
        { name: 'hit 1 card', value: 1 },
        { name: 'hit 2 cards', value: 2 },
        { name: 'hit 3 cards', value: 3 },
        { name: 'stay', value: 0 }
    ];

    return inquirer.prompt([
        {
            type: 'list',
            name: 'userSelected',
            message: 'select whether to hit or stay',
            choices: terms
        }
    ]);
};

// the playGame which contains our program logic
// handles getting a deck, drawing cards, prompting and determining winner
const playGame = async (args) => {
    try {
        const { count } = args;

        // in the game of 21 each person is dealt 2 cards to start with
        const dealCount = 2;

        // get a deck of cards or multiple decks
        const deckOfCards = await deck.buildDeck(count);
        const { deck_id } = deckOfCards;

        // deal 2 cards to the dealer from the deck that was requested above
        const dealerHand = await deck.drawCards(deck_id, dealCount);

        // use the slice method with return a copy of the array containing the specified elements
        // unlike push/pop slice DOES NOT change the original array
        const dealerSingleCard = dealerHand.cards.slice(0, 1);

        // calculate the value of the dealers single card
        const dealerHandTotal = _calculateHand(dealerSingleCard);
        _print('Dealer', dealerSingleCard, dealerHand.remaining, dealerHandTotal);

        // deal 2 cards to the player from the same deck that was requested above
        const playerHand = await deck.drawCards(deck_id, dealCount);

        // calculate the total of the player hand
        const playerHandTotal = _calculateHand(playerHand.cards);
        _print('Player', playerHand.cards, playerHand.remaining, playerHandTotal);

        const drawAgain = await _drawPrompt();
        console.log(drawAgain);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    playGame
};
