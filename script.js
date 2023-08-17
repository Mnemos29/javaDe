

const newGame = document.getElementById('newGame');
const hold = document.getElementById('hold');
const rollDice = document.getElementById('rollDice');
let roundPlayer1; // score du round du player 1
let roundPlayer2;// score du round du player 2
let scorePlayer1;// score total du player 1
let scorePlayer2;// score total du player 2


newGame.addEventListener('click',()=>{
    
   $('#scorePlayer1 ,#scorePlayer2 ,#currentScorePlayer1 ,#currentScorePlayer2').text(0)
})



hold.addEventListener('click', () => {
   alert('hold')
})

// e
hold.addEventListener('click', (event) => {
   event.stopPropagation();
   alert('children')
})

