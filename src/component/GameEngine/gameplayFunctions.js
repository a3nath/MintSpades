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
      points: 0,
      num: 1
    },
    {
      isWinner: false,
      hand: [], 
      team: "A",
      name: 'Bill',
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


//human clicked card

function humanClicked(e){
  console.log(e)
}

const humanTurn = (player, turn, suit, cardsTable) => {
    let cards = player.hand;
    let name = player.name
    let num = player.num
    let allowedCards = []

    if (cardsTable.length > 0 && suit){//hand.length > 0
      allowedCards  = cards.filter(card => card.Suit === suit)
   }
   const humanCard = document.querySelectorAll('.card')
   humanCard.forEach(card => card.addEventListener('click', humanClicked));

    //wait for click event
    // humanCard.forEach(card => card.addEventListener('click', cardCliked));    
};
//bot turn
//bot will play the first card in its deck
// if it has winning suit then first winning suit

const botSuit = (turn,name, num, cards, suit, cardsTable, allowedCards) => {
    cardsTable.push({'turn': turn, 'name': name, 'num':num, 'cards' : allowedCards[0]})
    let newPlayers = players.map(function(player){
      if (player.num === num){
        return {...player, 'hand': player.hand.splice(0,1)}
      }
      else return {...player}
    })
    players = [...newPlayers]  
}

const botTurn = (player, turn, suit, cardsTable) => {
 let cards = player.hand;
 let name = player.name
 let num = player.num
 let allowedCards = []
 console.log('botTurn')

 if (cardsTable.length > 0 && suit){//hand.length > 0
    allowedCards  = cards.filter(card => card.Suit === suit)
 }
 if (allowedCards.length > 0){
  botSuit(turn, name, num, cards, suit,cardsTable, allowedCards)
 }
 //if no card on table play first card { turn: 1, cards:[{ suit:, value: }] }
 else {
   cardsTable.push({'turn': turn, 'name':name, 'num':num, 'cards':cards[0]})
   let newPlayers = players.map(function(player){
     if (player.num === num){
       return {...player, 'hand': player.hand.splice(0,1)}
     }
     else return {...player}
   })
   players = [...newPlayers] 
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

// function callbackLoop(suit, players, cardsTable){
//   for (let turnsPlayed = 0; turnsPlayed < 4; turnsPlayed++) {
//     suit = WinningSuit(cardsTable)
//     //At starting, its first player
//     console.log('players')
//     console.log(players)
//     let currentPlayer = players[turnsPlayed]
    
//     //play Turn
//     if (currentPlayer.name !== 'You') {
//         setTimeout(botTurn(currentPlayer, turnsPlayed, suit, cardsTable), 10000)
//     }
//     else {
//         setTimeout(humanTurn(currentPlayer, turnsPlayed, suit, cardsTable), 5000)
//         //asynchornous code that takers user click
//         //below function doesnt execute until user input recieved
//         //should we chain it as a promise
//         //maybe round score should be chained?
//     }
//     // currentTurn = currentTurn + 1
    
//   }
// }

//calculate score for each round
const roundScore = (suit, cardsTable) => {
  //arr of filtered winning suit
  let arrWinSuit = cardsTable.filter(card => card.cards.Suit === suit);
  //card
  let winVal = arrWinSuit.map(arr => arr.cards.Value).reduce(highCard,0);
  //winCard {cards:{suit, val: }, index: , name: turn: }
  let winCard = arrWinSuit.filter(card => card.cards.Value === winVal)[0];
  let winIndex = setTimeout(winCard.turn, 1000);
  let winNum = winCard.num
  console.log(winCard)
  //new arr with updated score and isWinn
  let winPlayers = players.map(function(player){
    if (player.num === winNum){
      return {...player, 'isWinner': true, 'points': player.points + 10}
    }
    else {
      return {...player, 'isWinner': false}
    }
  })
  //reorder players
  let slicedPlayers = winPlayers.splice(winIndex, winPlayers.length - winIndex)
  let newPlayers = slicedPlayers.concat(winPlayers)
  players = [...newPlayers]
  cardsTable = [] 
  let player1Score = players.filter(player => player.num === 0)[0].points;
  let player2Score = players.filter(player => player.num === 1)[0].points;
  let player3Score = players.filter(player => player.num === 2)[0].points;
  let player4Score = players.filter(player => player.num === 3)[0].points;
  console.log(`Player1 ${player1Score} Player2 ${player2Score} Player3 ${player3Score} Player4 ${player4Score}`)
}


// function roundScore(suit, cardsTable){
//   let arrWinSuit = cardsTable.filter(card => card.cards.Suit === suit);
//   let test = new Promise((resolve, reject) => {
//     console.log('cardsTable')
//     console.log(cardsTable)
//     resolve()
//     console.log('suit')
//     console.log(suit)
//     console.log(arrWinSuit)
//     console.log('arrWinSuit')
//     return arrWinSuit
//   })

//   test.then(function (value) { 
//         console.log('testPrmose');
//         console.log(value)
//         let winVal = value.map(arr => arr.cards.Value).reduce(highCard,0)
//         let winCard = arrWinSuit.filter(card => card.cards.Value === winVal)[0];
//         console.log("winVal")
//         console.log(winVal)
//         console.log("winCard")
//         console.log(winCard)
//         return winCard})
//       .then(value => {
//         console.log('sec then')
//         console.log(value)
//         let winIndex = value.turn
//         let winNum = value.num
//         let winPlayers = players.map(function(player){
//           if (player.num === winNum){
//             return {...player, 'isWinner': true, 'points': player.points + 10}
//           }
//           else {
//             return {...player, 'isWinner': false}
//           }
//         })
//         //reorder players
//         let slicedPlayers = winPlayers.splice(winIndex, winPlayers.length - winIndex)
//         let newPlayers = slicedPlayers.concat(winPlayers)
//         players = [...newPlayers]
//         cardsTable = [] 
//       })
//       .then(finalScore => {
//         let player1Score = players.filter(player => player.num === 0)[0].points;
//         let player2Score = players.filter(player => player.num === 1)[0].points;
//         let player3Score = players.filter(player => player.num === 2)[0].points;
//         let player4Score = players.filter(player => player.num === 3)[0].points;
//         console.log(`Player1 ${player1Score} Player2 ${player2Score} Player3 ${player3Score} Player4 ${player4Score}`)
//       })
//       .catch( err => console.log('something wrong' + err))
// }

//function for round



const round = () => {
  //current player turn
  //let currentTurn = 0;
  //cards on table being played
  let cardsTable = [];
  let tableLength = cardsTable.length
  //current suit
  let suit = ''
  //play 4 turns in a round
  //
  // callbackLoop(suit, players, cardsTable)


  for (let turnsPlayed = 0; turnsPlayed < 4; turnsPlayed++) {
    
      suit = WinningSuit(cardsTable)
      //At starting, its first player
      let currentPlayer = players[turnsPlayed]
      
      //play Turn
      if (currentPlayer.name !== 'You') {
          botTurn(currentPlayer, turnsPlayed, suit, cardsTable)
      }
      else {
          humanTurn(currentPlayer, turnsPlayed, suit, cardsTable)
          //asynchornous code that takers user click
          //function executes when user input recieved
      }
      
      // calculate round winner after round ends
  }
   roundScore(suit, cardsTable)
}
    
//callback is for loop
//function (turnsPlayed)
//roundScore(suit, cardsTable, callback)

const gameEnd = () => {
  let player1Score = players.filter(player => player.num === 0)[0].points
  let player2Score = players.filter(player => player.num === 1)[0].points
  let player3Score = 0
  let player4Score = 0
  // let player3Score = players.filter(player => player.num === 2)[0].points
  // let player4Score = players.filter(player => player.num === 3)[0].points
  console.log(`Player1 ${player1Score} Player2 ${player2Score} Player3 ${player3Score} Player4 ${player4Score}`)
}

export const gamePlay = () => {
  //if players has more than 1 card
  //play round
  let i = 0
  while(i <= 12) {
      round()
      i++
  }
  //calculate score and winner for round
}

export const dealCards = () => {
  let deck = shuffleDeck(createDeck())
  deal(deck,players,13)
  players.forEach(x => {
      if (x.name !== 'You'){
          renderHand(x.hand)
      }})
}

export const executeGamePlay = () => {
  //bet cycle
    players.forEach(x => {
      if (x.name !== 'You'){
          //renderHand(x.hand)
          x.bet = prompt('please give Bet Amount')
          // console.log(x.bet)
      } else {
          x.bet = makeBets(x.hand,x.bet);
          //render comment for the botand updates the bet for the bots
          console.log(`${x.name} bet ${x.bet}`)
          // console.log(`${x.name} : ${JSON.stringify(x.hand)} `)

      }
  },gamePlay()
)}