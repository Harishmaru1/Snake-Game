// High Score
let highScore = localStorage.getItem("highScore") || 0;
document.getElementById("highScoreBox").innerHTML = "High Score: " + highScore;

// Game Variables
let inputDir = { x:0, y:0 };
let foodSound = new Audio('music/food.mp3');
let gameOverSound = new Audio('music/gameover.mp3');
let moveSound = new Audio('music/move.mp3');
let musicSound = new Audio('music/music.mp3');
musicSound.loop = true;

let speed = 7;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{x:13, y:15}];
let food = {x:6, y:7};

let board = document.getElementById("board");
let musicBtn = document.getElementById("musicBtn");

// Safe food generation
function generateSafeFood(snakeArr){
    let a=2, b=16, newFood;
    while(true){
        newFood = { x: Math.floor(a + Math.random()*(b-a)), y: Math.floor(a + Math.random()*(b-a))};
        let isOnSnake = snakeArr.some(p => p.x===newFood.x && p.y===newFood.y);
        if(!isOnSnake) return newFood;
    }
}

// Game Loop
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed) return;
    lastPaintTime = ctime;
    gameEngine();
}

// Collision
function isCollide(sarr){
    for(let i=1;i<sarr.length;i++){
        if(sarr[i].x===sarr[0].x && sarr[i].y===sarr[0].y) return true;
    }
    if(sarr[0].x>=18 || sarr[0].x<=0 || sarr[0].y>=18 || sarr[0].y<=0) return true;
    return false;
}

// Game Engine
function gameEngine(){
    // Game Over
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        musicSound.currentTime=0;
        inputDir={x:0,y:0};
        alert("Game Over!");
        snakeArr=[{x:13,y:15}];
        score=0;
        musicSound.play();
    }

    // Food Eat
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
        foodSound.play();
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x, y:snakeArr[0].y+inputDir.y});
        score++;
        if(score>highScore){
            highScore=score;
            localStorage.setItem("highScore", highScore);
        }
        document.getElementById("highScoreBox").innerHTML="High Score: "+highScore;
        food = generateSafeFood(snakeArr);
    }

    // Move Snake
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Render
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        let el=document.createElement("div");
        el.style.gridRowStart=e.y;
        el.style.gridColumnStart=e.x;
        el.classList.add(index===0?"head":"snake");
        board.appendChild(el);
    });

    let foodEl=document.createElement("div");
    foodEl.style.gridRowStart=food.y;
    foodEl.style.gridColumnStart=food.x;
    foodEl.classList.add("food");
    board.appendChild(foodEl);
}

window.requestAnimationFrame(main);

// Keyboard Controls
window.addEventListener("keydown",(e)=>{
    moveSound.play();
    switch(e.key){
        case "ArrowUp": inputDir={x:0,y:-1}; break;
        case "ArrowDown": inputDir={x:0,y:1}; break;
        case "ArrowLeft": inputDir={x:-1,y:0}; break;
        case "ArrowRight": inputDir={x:1,y:0}; break;
    }
});

// Music Button
let isMusicPlaying=false;
musicBtn.addEventListener("click",()=>{
    if(!isMusicPlaying){
        musicSound.currentTime=0;
        musicSound.play();
        isMusicPlaying=true;
        musicBtn.innerText="Music 🔊";
    } else{
        musicSound.pause();
        musicSound.currentTime=0;
        isMusicPlaying=false;
        musicBtn.innerText="Music 🎵";
    }
});

// Volume Control
document.getElementById("volumeControl").addEventListener("input",(e)=>{
    let vol=e.target.value;
    musicSound.volume=vol;
    foodSound.volume=vol;
    gameOverSound.volume=vol;
    moveSound.volume=vol;
});

// Dark Mode
document.getElementById("themeBtn").addEventListener("click",()=>{
    document.body.classList.toggle("dark");
    themeBtn.innerText = document.body.classList.contains("dark") ? "Light Mode ☀️" : "Dark Mode 🌙";
});

// ✅ Mobile buttons
document.getElementById("upBtn").addEventListener("click",()=>inputDir={x:0,y:-1});
document.getElementById("downBtn").addEventListener("click",()=>inputDir={x:0,y:1});
document.getElementById("leftBtn").addEventListener("click",()=>inputDir={x:-1,y:0});
document.getElementById("rightBtn").addEventListener("click",()=>inputDir={x:1,y:0});
