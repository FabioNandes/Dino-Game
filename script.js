const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const gameOver = document.querySelector('.game-over')
const score = document.querySelector('.score')

let isJumping = false;
let isGameOver = false;
let position = 0;
let count = 1;
let pontos = 0;

function handleKeyUp(event){
  if(event.keyCode === 38){
    if(!isJumping){
      jump();
    }
  }
}

function jump () {
  isJumping = true;

  let upInterval = setInterval(() => {
    if(position>=150){
      clearInterval(upInterval)

      let downInterval = setInterval(()=>{
        if(position<=0){
          clearInterval(downInterval);
          isJumping=false;
        }else{
          position -= 25;
          dino.style.bottom = position + 'px';
        }
      },25);
      }else{
        position += 25;
        dino.style.bottom = position + 'px';
      }
    }, 25);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  gameOver.style.display = 'none'

  if (isGameOver){ 
    gameOver.style.display = 'block'
    return;
  }


  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // Saiu da tela
      count++;
      if(count>=2){
        score.innerHTML = "Score: " + pontos;
        pontos+=100;
        count = 1;
      }
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 50 && position < 50) {
      // Game over
      clearInterval(leftTimer);
      gameOver.style.display = 'block'
      background.style.animation = 'none'
      background.style.webkitCancelAnimationFrame
      isGameOver = true;
    } else {
      if(!isGameOver){
        score.innerHTML = "Score: " + pontos;
        cactusPosition -= 10;
        cactus.style.left = cactusPosition + 'px';
      }
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}



createCactus();
document.addEventListener('keyup', handleKeyUp);