let players = [
    {
      isWinner: true,
      hand: [], 
      team: "A",
      name: 'Bob',
      bet: 0,
      points:0,
      
    },
    {
      isWinner: false,
      hand: [], 
      team: "B",
      name: 'Jack',
      bet: 0,
      points:0,
      
    },
    {
      isWinner: false,
      hand: [], 
      team: "A",
      name: 'You',
      bet: 0,
      points:0,
    },
    {
      isWinner: false,
      hand: [], 
      team: "B",
      name: 'Jill',
      bet: 0,
      points:0,
    }
  ];
  let suites = [
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
    for (let suite of suites) {
      for(let value of values) {
        deck.push({Value:value,Suite:suite})
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
      if(hand[i].Suite === 'spades'){
        spades++
      }
      if(hand[i].Suite === 'hearts'){
        hearts++
      }
      if(hand[i].Suite === 'diamonds'){
        diamonds++
      }
      if(hand[i].Suite === 'clubs'){
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
          suit.className = "suit " + hand[i].Suite;
  
          value.innerHTML = hand[i].Value;
          card.appendChild(value);
          card.appendChild(suit);
  
          document.getElementById('hand').appendChild(card);
      }
  }
export const executeGamePlay = () => {
    

    let deck = shuffleDeck(createDeck())
    deal(deck,players,13)
    players.forEach(x => {
        if(x.name === 'You'){
            renderHand(x.hand)
        }else {
            makeBets(x.hand,x.bet)
        }
    });
    //showBetInquiryModal()
    
    
   
    
    
    
    
    
  
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
  
  