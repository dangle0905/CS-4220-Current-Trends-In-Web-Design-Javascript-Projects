/* eslint-disable camelcase */
// Build in class with inquirer and using deck.js
const inquirer = require('inquirer');

const deck = require('./deck.js');

// helper functions for printing
const _print = (person, result, remaining, total) => {
    console.log('- - - - - - - - - - - - - - - - - - - - -');
    console.log(`${person} Shows:`);
    result.forEach((card) => {
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
            if (total + 11 <= 21){
                total += 11;
            }else if(total + 11 > 21){
                total += 1;
            }
        
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
    const terms = ['hit', 'stay'];

    return inquirer.prompt({
        type: 'list',
        name: 'userSelected',
        message: 'select whether to hit or stay',
        choices: terms
    });
};

// the playGame which contains our program logic
// handles getting a deck, drawing cards, prompting and determining winner
const playGame = async (args) => {
    try {

        const {count} = args;
 
        const dealCount = 2;

        const deckOfCards = await deck.buildDeck(count);

        const { deck_id } = deckOfCards;

        // deal two cards to the dealer from the same deck that was requested above (using the deck_id)
        const dealerHand = await deck.drawCards(deck_id, dealCount);
  

        // use slice method which returns an copy of the array containing the elements specified
        // unlike push/pop slice DOES NOT change the original array
        const dealerSingleCard = dealerHand.cards.slice(0, 1);
        const dealerHandTotal = _calculateHand(dealerSingleCard);
        _print('Dealer', dealerSingleCard, dealerHand.remaining, dealerHandTotal);

        // deal 2 cards to the user from the same deck that was requested above (using the deck_id)
        const playerHand = await deck.drawCards(deck_id, dealCount);

        //player hand total is type number
        const playerHandTotal = _calculateHand(playerHand.cards);
        _print('Player', playerHand.cards, playerHand.remaining, playerHandTotal);

        // prompt the user to 'hit' or 'stay'
        const drawAgain = await _drawPrompt();

        
        
        // LAB STARTS HERE

        if(drawAgain.userSelected === 'hit'){
            
            const cardDrawn = await deck.drawCards(deck_id, 1);  

            //update the player hand now. so each card in the array gets push into playerHand.cards
            cardDrawn.cards.forEach((card) => {
                playerHand.cards.push(card);
            });
            
            playerHand.remaining = cardDrawn.remaining;
     
        }

        //calls _decideWinner function
        _decideWinner(dealerHand,playerHand);

        // LAB ENDS WITH _decideWinner(...)
    } catch (error) {
        console.log(error);
    }
};

const _decideWinner = async (dealerHand, playerHand) => {
    const dealerHandTotal = _calculateHand(dealerHand.cards);
    const playerHandTotal = _calculateHand(playerHand.cards);

    _print('Dealer', dealerHand.cards, dealerHand.remaining, dealerHandTotal);
    _print('Player', playerHand.cards, playerHand.remaining, playerHandTotal);

    if ((dealerHandTotal > playerHandTotal) && dealerHandTotal <= 21 || playerHandTotal > 21){
        console.log('Dealer wins!');
    }
    else if((dealerHandTotal < playerHandTotal) && playerHandTotal <= 21 || dealerHandTotal > 21){
        console.log('Player wins!');
    }
    else if (dealerHandTotal === playerHandTotal){
        console.log('Draw!');
    }
}

module.exports = {
    playGame
};
