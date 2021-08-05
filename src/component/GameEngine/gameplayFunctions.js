//import {} from "../container/Game/botplay.js"
let players = [
    {
      isWinner: true,
      hand: [], 
      team: "A",
      name: 'Bob',
      bet: 0,
      points:0,
      num:0
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
      name: 'Alan',
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

const WinningSuit = (cardsTable) => {
  let suit = ''
  if (cardsTable.length > 0) {
    if  (cardsTable.filter(played => played.cards.Suit === 'spades')){
      suit = 'spades'
    }
    else {
      suit = cardsTable.filter(played => played.turn === 0)[0].cards.Suit
    }
  }
  return suit
}

// humanCard.forEach(card => card.addEventListener('click', humanClicked));

//human clicked card

// function humanClicked(e){
//     //translate target value to card value
//     //check card selected valid
//     // checkValid()
// }

const humanTurn = (player, turn, suit) => {
    let cards = player.hands;
    let allowedCards  = cards.filter(card => card.suit === suit)

    //wait for click event
    // humanCard.forEach(card => card.addEventListener('click', cardCliked));    
};
//bot turn
//bot will play the first card in its deck
// if it has winning suit then first winning suit

const botSuit = (turn,name, num, cards, suit, cardsTable, allowedCards) => {
    cardsTable.push({'turn': turn, 'name': name, 'cards' : allowedCards[0]})
    players = [...players,  {...players[num], hand: players[num].hand.splice(0,1)}]
}

const botTurn = (player, turn, suit, cardsTable) => {
 let cards = player.hand;
 let name = player.name
 let num = player.num
 let allowedCards = []

 if (suit){//hand.length > 0
    allowedCards  = cards.filter(card => card.Suit === suit)
 }
 if (allowedCards){
  botSuit(turn, name, num, cards, suit,cardsTable, allowedCards)
 }
 //if no card on table play first card { turn: 1, cards:[{ suit:, value: }] }
 else {
   cardsTable.push({'turn': turn, 'name':name, 'cards':cards[0]})
   players = [...players,  {...players[num], hand: players[num].hand.splice(0,1)}]
  }
}


//round Score

const highCard = (prevCard, newCard) => {
  const pictureSuit = ['J', 'Q', 'K', 'A']
  if  (Number.isInteger(prevCard) && Number.isInteger(newCard)){
   if (prevCard > newCard){
      return prevCard
    }
    else return newCard
  }
  else if (Number.isInteger(prevCard)){
    return newCard
  }
  else if (Number.isInteger(newCard)){
    return prevCard
 }
 else if (pictureSuit.indexOf(prevCard) > pictureSuit.indexOf(newCard)){
    return prevCard
  }
  else return newCard
}

//calculate score for each round
const roundScore = (suit, cardsTable, player) => {
  //arr of filtered winning suit
  let prevIndex = player.num;
  console.log(cardsTable)
  let arrWinSuit = cardsTable.filter(card => card.cards.Suit === suit);
  //card
  let winVal = arrWinSuit.map(arr => arr.cards.Value).reduce(highCard,0);
  //winCard {cards:{suit, val: }, index: , name: turn: }
  let winCard = arrWinSuit.filter(card => card.cards.Value === winVal)[0];
  let winIndex = winCard.index;
  //remove prevWinner
  if (prevIndex !== winIndex){
    players = [...players, {...players[prevIndex], 'isWinner': false}]
  }
  //update players arr 
  //score by 10 points, isWinner
  players = [...players,  {...players[winIndex], 'isWinner': true, 'score': players[winIndex].score + 10}]
}



//funcitons for Round
const round = () => {
    //current player turn
    let currentTurn = 0;
    //current player object
    let currentPlayer = {};
    //cards on table being played
    let cardsTable = [];
    let tableLength = cardsTable.length
    let suit = ""
 
    //play 4 turns in a round
    for (let turnsPlayed = 0; turnsPlayed < 4; turnsPlayed++) {
        
        suit = WinningSuit(tableLength)
        //At starting, its first player
        //should then switch to whoever wins round
        currentPlayer = players.filter(player => player.isWinner)[0]
        
        //play Turn
        if (currentPlayer.name !== 'You') {
            botTurn(currentPlayer, turnsPlayed, suit, cardsTable)
        }
        else {
            humanTurn(currentPlayer, turnsPlayed, suit, cardsTable)
        }
        currentTurn = currentTurn + 1
        
      }
        //calculate round winner after round ends
      //roundScore(suit, cardsTable, currentPlayer)
}
    


//calculate score for each round
// const roundScore = (suit, cardsTable) => {
//   //arr of filtered winning suit
//   console.log(cardsTable)
//   let arrWinSuit = cardsTable.filter(card => card.cards.Suit === suit)
//   //card
//   let winCard = arrWinSuit.map(arr => arr.cards.Value).reduce(function (prevNum, currNum){
//       return (currNum > prevNum) ? currNum : prevNum;
//   },0);
//   let winIndex = arrWinSuit.filter(card => card.cards.Value === winCard)[0].turn
//   //update player arr score by 10 points
//   players = [...players,  {...players[winIndex], score: players[winIndex].score + 10}]
// }


export const gamePlay = () => {
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
    

    }
    //,gamePlay()
  );
}

 // endgame() => //return a winner, is executed at some condition


