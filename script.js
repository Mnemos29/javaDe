

const newGame = document.getElementById('newGame');
const hold = document.getElementById('hold');
const rollDice = document.getElementById('rollDice');
let roundPlayer1 = 0; // score du round du player 1
let roundPlayer2 = 0;// score du round du player 2
let scorePlayer1 = 0;// score global du player 1
let scorePlayer2 = 0;// score global du player 2
let diceValue; // valeur du jet de dé
let currentPlayer; // numero du joueur actif

//newGame : initilize the game
newGame.addEventListener('click', () => {

   $('#scorePlayer1 ,#scorePlayer2 ,#roundPlayer1 ,#roundPlayer2').text(0);
   currentPlayer = 1;
   roundPlayer1 = 0;
   roundPlayer2 = 0;
   scorePlayer1 = 0;
   scorePlayer2 = 0;
})

// Return a random integer between a min value (included) and a max value (inclusive).
function getRandomIntInclusive(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

// roll the dice
rollDice.addEventListener('click', () => {

   diceValue = getRandomIntInclusive(1, 6)
   $('#canvasDice').text(diceValue);

   if (diceValue !== 1) {
      if (currentPlayer === 1) {
         roundPlayer1 = roundPlayer1 + diceValue;
         $('#roundPlayer1').text(roundPlayer1);
      } else {
         roundPlayer2 = roundPlayer2 + diceValue;
         $('#roundPlayer2').text(roundPlayer2);
      }

   } else {
      roundPlayer1 = 0 ;

      roundPlayer1 = 0 ;
      if (currentPlayer === 1) {
         currentPlayer = 2;
         $('#roundPlayer2').text(0)
      } else {
         currentPlayer = 1;
         $('#roundPlayer1').text(0)
      }
      alert('Tour perdu . c\'est au tour du joueur ' + currentPlayer);

   }
})




// e
hold.addEventListener('click', () => {
   if (currentPlayer === 1) {
      scorePlayer1 = roundPlayer1 + scorePlayer1;
      $('#roundPlayer1').text(0);
      $('#scorePlayer1').text(scorePlayer1);
      roundPlayer1 = 0;
      currentPlayer = 2;
   } else {
      scorePlayer2 = roundPlayer2 + scorePlayer2;
      $('#roundPlayer2').text(0);
      $('#scorePlayer2').text(scorePlayer1);
      roundPlayer2 = 0;
      currentPlayer = 1;
   }
   
})

