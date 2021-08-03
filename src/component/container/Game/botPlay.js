import React from 'react';


//players object

let players = [
    {
        name: 'bot1',
        num:'1',
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
        score: 0
    },
    {
        name: 'player',
        num:'2',
        type:'human',
        cards: [
            {
                suit: 'heart',
                value: 9
            },
            {
                suit: 'spade',
                value: 3,
            }
        ],
        score: 0
    },
    {
        name: 'bot2',
        num:'3',
        type:'bot',
        cards: [
            {
                suit: 'diamond',
                value: 7
            },
            {
                suit: 'heart',
                value: 1,
            }
        ],
        score: 0
    },
]

let cardsTable = [];


//human card selcted valid

const humanCard = document.querySelector('.card');

humanCard.forEach(card => card.addEventListener('click', humanClicked));

// function checkValid(card){
//     if (cardsTable.len > 0){
//         let prevcard = cardsTable[cardsTable.len - 1]
//         checkValid(cardSelected)
        
//     }
// }

//human clicked card

function humanClicked(e){
    //translate target value to card value
    //check card selected valid
    // checkValid()
}

const humanTurn = (player, turn, suit) => {
    let cards = player.cards;
    //allowed cards highlight
    let allowedCards  = cards.filter(card => card.suit === suit)
    //prompt to click card
    //wait for click event
    // humanCard.forEach(card => card.addEventListener('click', cardCliked));    
};

//play valid card for bot

const validCard = (turn, cards, suit) => {
    //get allowed cards from player deck
    let allowedCards  = cards.filter(card => card.suit == suit)
    if (allowedCards.len > 0){
        cardsTable.push({'turn': turn, 'cards' : allowedCards[0]})
    }
    //else play spades
    //otherwise get any card
    else {
        cardsTable.push({'turn': turn , 'cards':cards[0]})
    }
}

//bot turn

const botTurn = (player, turn, suit) => {
 let cards = player.cards;

 if (cardsTable.len > 0){
    //play valid bot turn
     validCard(turn, cards, suit)
 }
 //if no card on table play first card { turn: 1, cards:[{ suit:, value: }] }
 else cardsTable.push({'turn': turn, 'cards':cards[0]})
}


//whose turn it is
let turn = true;

//current player turn
//determines player turn
let currentTurn = 0;

//current player object
let currentPlayer = {};

const roundScore = (suit) => {
    //arr of filtered winning suit
    let arrWinSuit = cardsTable.filter(card => card.cards.suit === suit)
    //card
    let winCard = arrWinSuit.map(arr => arr.cards.value).reduce(function (prevNum, currNum){
        return (currNum > prevNum) ? currNum : prevNum;
    },0);
    let winIndex = arrWinSuit.filter(card => card.vards.value === winCard)[0].turn
    //update player arr score by 10 points
    players = [...players,  {...players[winIndex], score: players[winIndex].score + 10}]
}

[{'turn': 1, cards: {suit:'diamond', value:3 }}, {turn:2, cards: {}}, ]

const round = () => {
    //round start
    let roundStart = true;
    let suit = ''
    //turns remaining
    //turns played so far
    let turnsPlayed = 0;
    if (turnsPlayed < len(players)) {
        currentTurn += 1
        //filter out players
        currentPlayer = players.filter(player => player.num == currentTurn)
        if (cardsTable.len > 0){
            //current suit
            //cardsTable
            let arrSpades = cardsTable.filter(played => played.cards.suit === 'spades')
            let arrSuit = cardsTable.filter(played => played.turn === 1)
            if (arrSpades){
                suit = 'spades'
            }
            else{
                suit = arrSuit.cards.suit
            }
        }
        if (currentPlayer.type == 'bot') {
            botTurn(currentPlayer, currentTurn, suit)
            turnsPlayed += 1
        }
        else {
            humanTurn(currentPlayer, currentTurn, suit)
            turnsPlayed += 1
            // human play function
            // check valid card played
        }
        //}
            //wait for human turn
                //if card played valid
                    //turn end
                //else human turn again
    //cardsTable = []
    }
    roundStart = false
    //calculate round winner
    roundScore(suit)
}

const gamePlay = () => {
    //if players has more than 1 card
    //play round
    if (players[0].cards.len > 1){
    //play round
        round()
    }
    else {
        gameEnd()
        //calculate score and winner for round
    }
}

//play 13 rounds

gamePlay()

// Game Engine Function Breakdown

// Give 13 cards to each player.
// Player turn, hold bots / input function.
// Basic Bot function to play a card based on rules (Suit, or spades if not available, or discard a card).
// Player legal card function.
// If the player has a card that matches suit, must play 1 of those. Else play a Spade, else chooose card to discard.