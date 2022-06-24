const buildDeck = () => {
    const suits = ['Spades', 'Heart', 'Diamonds', 'Clubs'];
    const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

    const cards = [];
    suits.forEach((suit) => {
        values.forEach((value) => {
            cards.push({ value, suit });
        });
    });

    return { cards, remaining: cards.length };
};

// use the Fisher-Yates method for shuffling cards
const shuffleDeck = (cards) => {
    let index = cards.length;
    let randomNumber;
    let swapCard;

    while (0 !== index) {
        // Math.random() return a float between 0 and 1
        // multiply that by the index and take the floor to get an integer
        randomNumber = Math.floor(Math.random() * index);

        // decrement the index so we go through the array and eventually get to 0
        index = index - 1;

        // get the card that will be swapped
        swapCard = cards[index];

        // swap the cards in place in the cards array
        cards[index] = cards[randomNumber];
        cards[randomNumber] = swapCard;
    }

    return { cards, remaining: cards.length };
};

const drawCards = (cards, number = 1) => {
    const drawn = cards.splice(0, number);

    return { drawn, cards, remaining: cards.length };
};

module.exports = {
    buildDeck,
    shuffleDeck,
    drawCards
};
