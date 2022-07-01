import Ball from "./ball.js"

const ball = new Ball(document.getElementById("ball"));
let paddleTop = document.querySelector("#paddle-top");
let paddleBottom = document.querySelector("#paddle-bottom");
let moveBy = 30;

let lastTime;
function update(time){
    if(lastTime != null){
        const delta = time - lastTime;
        ball.update(delta, [paddleTop.getBoundingClientRect(), paddleBottom.getBoundingClientRect()]);
        if(isLose()) handleLose();
    }
    
    lastTime = time;
    window.requestAnimationFrame(update);
}

window.addEventListener('load', handlePaddle);
window.addEventListener('resize', handlePaddle);

document.addEventListener("keydown", e => {
    switch(e.key){
        case "ArrowLeft" :
            paddleTop.style.left = parseInt(paddleTop.style.left) - moveBy + 'px';
            paddleBottom.style.left = parseInt(paddleBottom.style.left) - moveBy + 'px';
            break;
        
        case "ArrowRight" :
            paddleTop.style.left = parseInt(paddleTop.style.left) + moveBy + 'px';
            paddleBottom.style.left = parseInt(paddleBottom.style.left) + moveBy + 'px';
            break;
            
    }
});

function isLose() {
    const rect = ball.rect();
    return rect.top >= window.innerHeight || rect.top <= 0;
}

function handleLose() {
    const rect = ball.rect()
    ball.reset();
    // if (rect.top >= window.innerHeight) {
    //   alert("ROD 1 WIN");
    // } else {
    //     alert("ROD 2 WIN");
    // }
    // alert();
    
    handlePaddle();
}

function handlePaddle(){
    paddleTop.style.position = 'absolute';
    paddleTop.style.left = window.innerWidth/2 - 0.09 * window.innerWidth + 'px';
    paddleBottom.style.left = window.innerWidth/2 - 0.09 * window.innerWidth + 'px';
}
window.requestAnimationFrame(update);