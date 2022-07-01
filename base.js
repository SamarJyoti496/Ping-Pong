

let ball = document.getElementById("ball");
let paddleTop = document.querySelector("#paddle-top");
let paddleBottom = document.querySelector("#paddle-bottom");



let highestScore = 0, record = -1, winner = -1;
let score = [0, 0];
let start = true;
let A_pressed = false;
let D_pressed = false;
let Vx = -2;
let Vy = -2;
let V = Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2));
let ID;
handle();
helper();

gameLoop();
function gameLoop( ){
    setTimeout(() =>{
        ID = setInterval(() => {
            if(marginTop(ball) < 0){
                reset();
                return;
            }
            
            if(marginTop(ball) > window.innerHeight){
                reset();
                return;
            }

            if(marginLeft(ball) < 0 || marginLeft(ball) > window.innerWidth){
               Vx = - Vx;
            }

            let paddleRects = [paddleTop.getBoundingClientRect(), paddleBottom.getBoundingClientRect()];
            let rect = ball.getBoundingClientRect();

            for(let i = 0; i < 2; i++){
                if(isCollision(paddleRects[i], rect)){
                    score[i]++;
                    Vy = - Vy
                    if(score[i] > highestScore){
                        highestScore = score[i];
                        record = i + 1;
                    }
                }
            }
            
            ball.style.marginLeft = `${marginLeft(ball) + Vx}px`
            ball.style.marginTop = `${marginTop(ball) + Vy}px`
            
            if(A_pressed && marginLeft(paddleTop) > 0){
                paddleTop.style.marginLeft = `${marginLeft(paddleTop) - 2}px`
                paddleBottom.style.marginLeft = `${marginLeft(paddleBottom) - 2}px`
            }else if(D_pressed && paddleRects[0].right < window.innerWidth){
                paddleTop.style.marginLeft = `${marginLeft(paddleTop) + 2}px`
                paddleBottom.style.marginLeft = `${marginLeft(paddleBottom) + 2}px`
            }
       }, 5);
    }, 500);
}

window.addEventListener('load', handle);
window.addEventListener('resize', handle);

document.addEventListener("keydown", e => {
    if(e.key == "d"){
        D_pressed = true;
    }else if(e.key == "a"){
        A_pressed = true;
    }
});


document.addEventListener("keyup", e => {
    if(e.key == "d"){
        D_pressed = false;
    }else if(e.key == "a"){
        A_pressed = false;
    }
});

function reset(){
   clearInterval(ID);
   Vx = -2;
   Vy = -2;
   handleLose();
   V = Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2));
   handle();
   helper();
   score = [0,0];
   gameLoop();
}

function isCollision(rect1, rect2) {
    return (
      rect1.left <= rect2.right &&
      rect1.right >= rect2.left &&
      rect1.top <= rect2.bottom &&
      rect1.bottom >= rect2.top
    )
}

function handleLose() {
    const rect = ball.getBoundingClientRect();
    if (rect.top >= window.innerHeight) { 
        winner = 1;
       alert(`Rod 1 wins with a score ${score[0]}, Highest Score is ${highestScore}`);
    } else if(rect.top < 0){
        winner = 2;
        alert(`Rod 2 wins with a score ${score[1]}, Highest Score is ${highestScore}`);
    }
    
}

function handle(){
    paddleTop.style.position = 'absolute';
    paddleTop.style.marginLeft = window.innerWidth/2 - 0.09 * window.innerWidth + 'px';
    paddleBottom.style.marginLeft = window.innerWidth/2 - 0.09 * window.innerWidth + 'px';
    ball.style.marginLeft = window.innerWidth/2 + 'px';
    ball.style.marginTop = window.innerHeight/2 + 'px';
}

function marginLeft(elem){
   return Number(elem.style.marginLeft.split('p')[0]);
}

function marginTop(elem){
   return Number(elem.style.marginTop.split('p')[0]);
}

function helper(){
    if(winner == -1){
        alert("Let's Score");
    }else if(record === 1){
        alert(`ROD 1 has highest score ${highestScore}`);
    }else{
        alert(`ROD 2 has highest score ${highestScore}`);
    }
}
