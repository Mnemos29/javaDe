


const newGame = document.getElementById('newGame');
const hold = document.getElementById('hold');
const rollDice = document.getElementById('rollDice');
let roundPlayer1 = 0; // score du round du player 1
let roundPlayer2 = 0;// score du round du player 2
let scorePlayer1 = 0;// score global du player 1
let scorePlayer2 = 0;// score global du player 2
let diceValue; // valeur du jet de dé
let currentPlayer; // numero du joueur actif
let gameStart = false; // 

//newGame : initilize the game
newGame.addEventListener('click', function initializeGame() {

   $('#scorePlayer1 ,#scorePlayer2 ,#roundPlayer1 ,#roundPlayer2').text(0);
   currentPlayer = 1;
   roundPlayer1 = 99;
   roundPlayer2 = 0;
   scorePlayer1 = 0;
   scorePlayer2 = 0;
   gameStart = true;
})

// Return a random integer between a min value (included) and a max value (inclusive).
function getRandomIntInclusive(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

// roll the dice
rollDice.addEventListener('click', () => {
   if (gameStart === true) {
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
         roundPlayer1 = 0;
         roundPlayer2 = 0;
         $('#roundPlayer1').text(0);
         $('#roundPlayer2').text(0);
         if (currentPlayer === 1) {
            currentPlayer = 2;
            $('#roundPlayer2').text(0)
         } else {
            currentPlayer = 1;
            $('#roundPlayer1').text(0)
         }
         alert('Tour perdu . c\'est au tour du joueur ' + currentPlayer);
      }
   } else {
      alert('Appuyez sur NEW GAME pour commencer la partie');
   }

})




// adds the temporary score to the overall score
hold.addEventListener('click', () => {
   if (gameStart === true) {
      if (currentPlayer === 1) {
         scorePlayer1 = roundPlayer1 + scorePlayer1;
         $('#roundPlayer1').text(0);
         $('#scorePlayer1').text(scorePlayer1);
         andTheWinnerIs(scorePlayer1);
         changePlayer(currentPlayer);

      } else {
         scorePlayer2 = roundPlayer2 + scorePlayer2;
         $('#roundPlayer2').text(0);
         $('#scorePlayer2').text(scorePlayer2);
         andTheWinnerIs(scorePlayer2);
         changePlayer(currentPlayer);
         
      }
   } else {
      alert('Appuyez sur NEW GAME pour commencer la partie');
   }
})

//Checks if the current player is the winner
function andTheWinnerIs(total) {
   if (total >= 100) {
      winner = true;
      alert('Bravo, le gagnant est le joueur' + currentPlayer)
      gameStart = false;
      
   }
}





//Alternates between the 2 players and resets their temporary scores
function changePlayer(numPlayer) {
   if (winner !== true) {
      roundPlayer1 = 0;
      roundPlayer2 = 0;
      if (numPlayer === 1) {
         currentPlayer = 2;
      } else {
         currentPlayer = 1
      }
   }

}
//=======================
//dice
import * as THREE from 'three';

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer(
{
   canvas: document.getElementById('canvasDice')
} );
const camera = new THREE.PerspectiveCamera(75, canvasDice.width / canvasDice.height, 0.1, 1000);

const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
const box = new THREE.Mesh(geometry, material);

scene.add(box);
scene.background = new THREE.Color(0xffffff);
camera.position.z = 20;

renderer.setSize(canvasDice.width, canvasDice.height);
//document.body.appendChild(renderer.domElement);
                          
function animate() {
    box.rotation.x += 0.01
    box.rotation.y += 0.01
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate();
