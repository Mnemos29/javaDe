


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
let winner = false;
let messageChangePlayer = 'Appuyez sur NEW GAME pour commencer la partie';

//newGame : initilize the game
newGame.addEventListener('click', function initializeGame() {

   $('#scorePlayer1 ,#scorePlayer2 ,#roundPlayer1 ,#roundPlayer2').text(0);
   currentPlayer = 1;
   roundPlayer1 = 0;
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
      diceValue = getRandomIntInclusive(1, 6);
      //diceValue = 1 // a supprimer
      cameraDicePosition(diceValue);
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
         changePlayer(currentPlayer);
         alert('Tour perdu . c\'est au tour du joueur ' + currentPlayer);
      }
   } else {
      alert(messageChangePlayer);
   }
   
})

// player red dot :


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
      alert(messageChangePlayer);
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
         $('#player2PointRed').css( "fill","#ff3933" );
         $('#player1PointRed').css( "fill","#ffffff" );
      } else {
         currentPlayer = 1
         $('#player1PointRed').css( "fill","#ff3933" );
         $('#player2PointRed').css( "fill","#ffffff" );
      }
   }

}

//=======================
//dice with threejs
import * as THREE from 'three';
import { OrbitControls } from 'node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'node_modules/three/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene()


const light = new THREE.SpotLight(0xffffff, 1150)
const light2 = new THREE.SpotLight(0xffffff, 1150)
light.position.set(5, 5, 5)
light2.position.set(-5,-5,-5)
scene.add(light, light2)
const canvas = document.getElementById('canvasDice');

 

const renderer = new THREE.WebGLRenderer(
   {
      canvas: canvas
   }
)
const camera = new THREE.PerspectiveCamera(
    75,
    canvas.width / canvas.height,
    0.1,
    1000
)
camera.position.z = 5
camera.position.x = 1.
//renderer.shadowMap.enabled = false
renderer.setSize(canvas.width, canvas.height )


const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const loader = new GLTFLoader()
loader.load(
    './dice.glb',
    function (gltf) {
        scene.add(gltf.scene)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)
scene.background = new THREE.Color(0xffffff)



function animate() {
    requestAnimationFrame(animate);
   
    controls.update()

    render()

    
}

function render() {
    renderer.render(scene, camera)
}

animate()

function cameraDicePosition(diceValue){
   switch (diceValue){
      case 1:
         camera.position.x = 0
         camera.position.y = 0
         camera.position.z = -5
         
      break;
      case 2:
         
         camera.position.x = 0
         camera.position.y = 5
         camera.position.z = 0
         
      break;
      case 3:
         camera.position.x = 0
         camera.position.y = 0
         camera.position.z = 5
         
      break;
      case 4:
         camera.position.x = 0
         camera.position.y = -5
         camera.position.z = 0
        
      break;
      case 5:
         camera.position.x = -5
         camera.position.y = 0
         camera.position.z = 0
         
      break;
      case 6:
         camera.position.x = 5
         camera.position.y = 0
         camera.position.z = 0
         
      break;

   }
}
 