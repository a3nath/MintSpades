//import {} from "../container/Game/botplay.js"
let players = [
    {
      isWinner: true,
      hand: [], 
      team: "A",
      name: 'Bob',
      bet: 0,
      points:0,
      num: 0 ,
    },
    {
      isWinner: false,
      hand: [], 
      team: "B",
      name: 'Jack',
      bet: 0,
      score: 0,
      num: 1
    },
    {
      isWinner: false,
      hand: [], 
      team: "A",
      name: 'You',
      bet: 0,
      points:0,
      num: 2
    },
    {
      isWinner: false,
      hand: [], 
      team: "B",
      name: 'Jill',
      bet: 0,
      points:0,
      num: 3
    }
  ];
  let suits = [
    'hearts',
    'spades',
    'clubs',
    'diamonds'
  ]
  let values = [
    'A',
    'K',
    'Q',
    'J',
    '10',
    '9', 
    '8',
    '7',
    '6',
    '5',
    '4',
    '3',
    '2'
  ];
  
  let createDeck = () => {
    let deck = []; 
    for (let suit of suits) {
      for(let value of values) {
        deck.push({Value:value,Suit:suit})
      }
    }
    
    return deck;
  }
  
  function shuffleDeck(deck) {
    let count = deck.length;
    while(count) {
      deck.push(deck.splice(Math.floor(Math.random() * count), 1)[0]);
      count -= 1;
    }
    return deck
  }
  
  function deal(deck, players, numCards) {
    players.forEach(player => {
      while(player.hand.length !== numCards) {
        player.hand.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0]);
      }
    });
  }
  
  function makeBets(hand, bet){
    let spades = 0;
    let hearts = 0;
    let diamonds = 0;
    let clubs = 0;
    for(let i = 0; i < hand.length; i++){
      if(hand[i].Suit === 'spades'){
        spades++
      }
      if(hand[i].Suit === 'hearts'){
        hearts++
      }
      if(hand[i].Suit === 'diamonds'){
        diamonds++
      }
      if(hand[i].Suit === 'clubs'){
        clubs++
      }
      if (hand[i].Value === "A"|| hand[i].Value === "K" ) {
        bet++
      }
    }
    if((spades > 2 && hearts <=2 )||(spades > 2 && diamonds <=2 )|| (spades > 2 && clubs <=2  )) {
      bet++
    }
    return bet
  }
  function renderHand(hand)
  {
        document.getElementById('hand').innerHTML = "";
  
      for(let i = 0; i < hand.length; i++)
      {
          let card = document.createElement("div");
          let value = document.createElement("div");
          let suit = document.createElement("div");
          card.className = "card";
          value.className = "value";
          suit.className = "suit " + hand[i].Suit;
          value.innerHTML = hand[i].Value;
          card.addEventListener('click', (e) => {
              let collection = e.target.children
              if(collection.length === 2){
                  console.log(e.target.children[0])
                  console.log(e.target.children[1])
              } });
          
          card.appendChild(value);
          card.appendChild(suit);
        
          document.getElementById('hand').appendChild(card);
     }
}

const humanCard = window.document.querySelector('.card');

// humanCard.forEach(card => card.addEventListener('click', console.log('human')));

// function checkValid(card){
//     if (cardsTable.length > 0){
//         let prevcard = cardsTable[cardsTable.len - 1]
//         checkValid(cardSelected)
        
//     }
// }

//human clicked card

// function humanClicked(e){
//     //translate target value to card value
//     //check card selected valid
//     // checkValid()
//     console.log('here')
// }

const humanTurn = (player, turn, suit) => {
    console.log('')
    // let cards = player.hand;
    // //allowed cards highlight
    // let allowedCards  = cards.filter(card => card.suit === suit)
    //prompt to click card
    //wait for click event
    // humanCard.forEach(card => card.addEventListener('click', cardCliked));    
};

//check valid bot card

const validCard = (turn, cards, suit, cardsTable) => {
    //get allowed cards from player deck
    let allowedCards  = cards.filter(card => card.Suit === suit)
    if (allowedCards.length > 0){
        cardsTable.push({'turn': turn, 'cards' : allowedCards[0]})
        players = [...players,  {...players[turn], hand: players[turn].hand.splice(0,1)}]
    }
    //else play spades
    //otherwise get any card
    else {
        cardsTable.push({'turn': turn , 'cards':cards[0]})
        players = [...players,  {...players[turn], hand: players[turn].hand.splice(0,1)}]
    }
}


//bot turn

const botTurn = (player, turn, suit, cardsTable) => {
 let cards = player.hand;

 if (cardsTable.length > 0){ //hand.length > 0
    //play valid bot turn
     validCard(turn, cards, suit, cardsTable)
 }
 //if no card on table play first card { turn: 1, cards:[{ suit:, value: }] }
 else {
   cardsTable.push({'turn': turn, 'cards':cards[0]})
  players = [...players,  {...players[turn], hand: players[turn].hand.splice(0,1)}]
  }
}


//calculate score for each round
const roundScore = (suit, cardsTable) => {
    //arr of filtered winning suit
    console.log(cardsTable)
    let arrWinSuit = cardsTable.filter(card => card.cards.Suit === suit)
    //card
    let winCard = arrWinSuit.map(arr => arr.cards.Value).reduce(function (prevNum, currNum){
        return (currNum > prevNum) ? currNum : prevNum;
    },0);
    let winIndex = arrWinSuit.filter(card => card.cards.Value === winCard)[0].turn
    //update player arr score by 10 points
    players = [...players,  {...players[winIndex], score: players[winIndex].score + 10}]
}

const WinningSuit = () => {
  if (tableLength > 0) {
    if  (cardsTable.filter(played => played.cards.Suit === 'spades')){
      suit = 'spades'
    }
    else
      suit = cardsTable.filter(played => played.turn === 0)[0].cards.Suit
  }
  return suit
}

const playTurn = () => {
  if (playerTurn === 'bot'){
    //play bot turn
    //BotTurn(suit, turn, cards)
  }
  else {
    //humanTurn(suit, turn, cards)
  }
}

//funcitons for Round
const round = () => {
    //current player turn
    let currentTurn = 0;
    //current player object
    let currentPlayer = {};
    //cards on table being played
    let cardsTable = [];
    let tableLength = cardsTable.length()
    //winning suit
    let suit = ''
    //play 4 turns in a round
    for (let turnsPlayed = 0; turnsPlayed < 4; turnsPlayed++) {
        //filter out players
        currentPlayer = players.filter(player => player.num === currentTurn)[0]
        
        //play Turn
        //break it down here
        
        if (cardsTable.length > 0){
            //current suit
            //cardsTable
            console.log(cardsTable)
            console.log(cardsTable[0].cards.Suit)
            let arrSpades = cardsTable.filter(played => played.cards.Suit === 'spades')
            let arrSuit = cardsTable.filter(played => played.turn === 0)
            if (arrSpades){
                suit = 'spades'
            }
            else{
                suit = arrSuit[0].cards.Suit
            }
        }

        if (currentPlayer.name !== 'You') {
            botTurn(currentPlayer, currentTurn, suit, cardsTable)
        }

        else {
            humanTurn(currentPlayer, currentTurn, suit, cardsTable)
            // human play function
            // check valid card played
        }

        //}
            //wait for human turn
                //if card played valid
                    //turn end
                //else human turn again
    //cardsTable = []
    currentTurn = currentTurn + 1
    }
    //roundStart = false
    //calculate round winner
    // roundScore(suit, cardsTable)
}


const gamePlay = () => {
    //if players has more than 1 card
    //play round
    let i = 0
    while(i <= 13) {
        round()
    }
        //gameEnd()
        //calculate score and winner for round
}



export const dealCards = () => {
    let deck = shuffleDeck(createDeck())
    deal(deck,players,13)
    players.forEach(x => {
        if (x.name === 'You'){
            renderHand(x.hand)
        }})
    
}
export const executeGamePlay = () => {
    //bet cycle
     players.forEach(x => {
        if (x.name === 'You'){
            //renderHand(x.hand)
            x.bet = prompt('please give Bet Amount')
            // console.log(x.bet)
        } else {
            x.bet = makeBets(x.hand,x.bet);
            //render comment for the botand updates the bet for the bots
            // console.log(`${x.name} bet ${x.bet}`)
            // console.log(`${x.name} : ${JSON.stringify(x.hand)} `)
        }
    //round iteration
    
    //if(player.isWinner is true) {
        //players.unshift(players.splice(index)[0])
    
    },
    gamePlay());

  
    
   
    
    
    
    
    
  
    //sortHands(based on point system, which changes on initial card played, initial sort will exclude spades as top values, highest card in suit, order is arbitrary )// uneeded for mvp
    //makeBets(bets are based on number of top cards, spades, and if less than or equal to only two of a suit is present we add 1 bet - but only if we have atleast 1 spade ( the logic is that we will run out of that suite sooner and we will win based on playing a low spade))
    
    //iterate through currentState 
      //if player.isWinner is true 
         
        //player.playHand()//slices value from hand array
        //if player.name === 'you'
          // await for click
          // click event will send card value 
          //search in hand array event target value, splice it out of player array
          //playerhand.splice()
          //remove node or rerender players hand
          //update player order function
      //winner of each round, add bet, set winner, continue iteration of rounds (13 at start) decrement
    // endgame() => //return a winner, is executed at some condition
  }