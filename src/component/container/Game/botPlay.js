// const botPlay = (bot) => {
//     let card = bot.cards.pop();
//     console.log('bot played: ' + ${card.suit} ${card.value});
//     playerTurn++;
//     return ${card.suit} ${card.value};
// }

// async function playerPlay() {
//     console.log('Play a card!');
//     await getInput();
// }

// async function getInput(playerInput) {

//     return playerInput;
// }

let players = [
    {
        name: 'bot1',
        num:'0',
        type:'bot',
        cards: [
            {
                suit: 'heart',
                value: 7
            },
            {
                suit: 'spade',
                value: 1,
            }
        ],
        playCard: () => botPlay(players[0])
    },
    {
        name: 'player',
        num:'1',
        type:'human',
        cards: [
            {
                suit: 'heart',
                value: 7
            },
            {
                suit: 'spade',
                value: 99,
            }
        ],
        playCard: () => playerPlay
    }
]

const gameRound = () => {
    if (playerTurn < 4) {
        players[playerTurn].playCard();
        playerTurn++;
    }
}

gameRound();

let turn = true
let roundStart = true
let currentTurn = 0
let turnsPlayed = 0

let currentCards 

const playTurn = () => {

}

const round = () => {
    //roundStart = true
    //if (turnsPlayed < len(players))
    //currentTurn += 1
        //if (currentTurn == bot
            //determine valid card
            //play valid card random
        //if turn human
            //wait for human turn
                //if card played valid
                    //turn end
                //else human turn again
    //roundStart = false
}

const gamePlay = () => {
    if (currentcards > 1){
        round()
    }
    if (currentcards == 0){
        gameEnd()
    }

}

// Game Engine Function Breakdown

// Give 13 cards to each player.
// Player turn, hold bots / input function.
// Basic Bot function to play a card based on rules (Suit, or spades if not available, or discard a card).
// Player legal card function.
// If the player has a card that matches suit, must play 1 of those. Else play a Spade, else chooose card to discard.