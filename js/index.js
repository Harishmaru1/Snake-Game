// ===== SOUNDS =====
let foodSound = new Audio('music/food.mp3');
let gameOverSound = new Audio('music/gameover.mp3');
let moveSound = new Audio('music/move.mp3');
let musicSound = new Audio('music/music.mp3');
musicSound.loop = true;

// ===== GAME VARIABLES =====
let board = document.getElementById("board");
let musicBtn = document.getElementById("musicBtn");
let themeBtn = document.getElementById("themeBtn");

let inputDir = {x: 0, y: 0};
let speed = 7;
let score = 0;
let lastPaintTime = 0;

let snakeArr = [{x:13, y:15}];
let food = {x:6, y:7};

let highScore = localStorage.getItem("highScore") || 0;
document.getElementById("highScoreBox").innerHTML = "High Score: " + highScore;

// ===== SAFE FOOD GENERATION =====
function generateSafeFood(snakeArr) {
    let a = 2, b = 16;
    let newFood;
    while(true){
        newFood = { x: Math.floor(a + Math.random()*(b-a)), y: Math.floor(a + Math.random()*(b-a)) };
        let onSnake = snakeArr.some(part => part.x===newFood.x && part.y===newFood.y);
        if(!onSnake) return newFood;
    }
}

// ===== COLLISION CHECK =====
function isCollide(snake){
    for(let i=1; i<snake.length; i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y) return true;
    }
    if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y>=18 || snake[0].y<=0) return true;
    return false;
}

// ===== MAIN GAME ENGINE =====
function gameEngine(){
    // GAME OVER
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        musicSound.currentTime=0;
        inputDir={x:0,y:0};
        snakeArr = [{x:13,y:15}];
        score=0;

        // HEAD ANIMATION
        let headDiv = document.querySelector(".head");
        if(headDiv) headDiv.classList.add("collide");
        setTimeout(()=>{if(headDiv) headDiv.classList.remove("collide");},300);

        musicSound.play();
    }

    // EAT FOOD
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x+inputDir.x, y: snakeArr[0].y+inputDir.y});
        score++;
        if(score>highScore){ highScore=score; localStorage.setItem("highScore", highScore);}
        document.getElementById("highScoreBox").innerHTML="High Score: "+highScore;
        food = generateSafeFood(snakeArr);
    }

    // MOVE SNAKE
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;

    // RENDER
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        let el = document.createElement("div");
        el.style.gridRowStart=e.y;
        el.style.gridColumnStart=e.x;
        el.classList.add(index===0?"head":"snake");
        board.appendChild(el);
    });

    let foodEl = document.createElement("div");
    foodEl.style.gridRowStart=food.y;
    foodEl.style.gridColumnStart=food.x;
    foodEl.classList.add("food");
    board.appendChild(foodEl);
}

// ===== GAME LOOP =====
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1/speed) return;
    lastPaintTime=ctime;
    gameEngine();
}
window.requestAnimationFrame(main);

// ===== KEYBOARD CONTROLS =====
window.addEventListener("keydown", (e)=>{
    moveSound.play();
    switch(e.key){
        case "ArrowUp": inputDir={x:0,y:-1}; break;
        case "ArrowDown": inputDir={x:0,y:1}; break;
        case "ArrowLeft": inputDir={x:-1,y:0}; break;
        case "ArrowRight": inputDir={x:1,y:0}; break;
    }
});

// ===== MUSIC BUTTON =====
let isMusicPlaying=false;
musicBtn.addEventListener("click",()=>{
    if(!isMusicPlaying){ musicSound.currentTime=0; musicSound.play(); isMusicPlaying=true; musicBtn.innerText="Music 🔊";}
    else{ musicSound.pause(); musicSound.currentTime=0; isMusicPlaying=false; musicBtn.innerText="Music 🎵";}
});

// ===== THEME BUTTON =====
themeBtn.addEventListener("click",()=>{
    document.body.classList.toggle("dark");
    themeBtn.innerText=document.body.classList.contains("dark")?"Light Mode ☀️":"Dark Mode 🌙";
});
