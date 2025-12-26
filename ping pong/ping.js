const gameboard=document.querySelector("#gameboard");
const context=gameboard.getContext("2d");
const score=document.querySelector("#score");
const reset=document.querySelector("#resetbtn");
const start=document.querySelector("#startbtn");
const gamewidth=gameboard.width;
const gameheight=gameboard.height;
const boardbg="rgb(3, 3, 65)";
const paddle1color="white";
const paddle2color="white";
const paddleborder="black";
const ballcolor="white";
const ballbordercolor="black";
const ballradius=12.5;
const paddlespeed=50;
let intervalid;
let ballspeed=1;
let ballx=gamewidth/2;
let bally=gameheight/2;
let ballxdirection=0;
let ballydirection=0;
let player1=0;
let player2=0;
let paddle1={
    width:25,
    height:100,
    x:0,
    y:0
};
let paddle2={
    width:25,
    height:100,
    x:gamewidth-25,
    y:gameheight-100 
};

let gamerunning=false;

window.addEventListener("keydown",changedirection);
start.addEventListener("click",gamestart);
reset.addEventListener("click",resetgame);
function gamestart(){
    if(!gamerunning){
        gamerunning=true;
    createball();
    nexttic();
    }
}
function nexttic(){
    intervalid=setTimeout(()=>{
        clearboard();
        drawpaddles();
        moveball();
        drawball(ballx,bally);
        checkcollision();
        if (player1 >= 10 || player2 >= 10) {
            displayWinner();
            return; 
        }
        nexttic();
    },10)
};
function clearboard(){
    context.fillStyle=boardbg;
    context.fillRect(0,0,gamewidth,gameheight);
};

function drawpaddles(){
    context.strokeStyle=paddleborder;

    context.fillStyle=paddle1color;
    context.fillRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height);
    context.strokeRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height);

    context.fillStyle=paddle2color;
    context.fillRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);
    context.strokeRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);
};
function changedirection(event){
    const keypressed=event.keyCode;
    const paddle1up=87;
    const paddle1down=83;
    const paddle2up=38;
    const paddle2down=40;
    switch(keypressed){
        case(paddle1up):
           if(paddle1.y>0){
            paddle1.y-=paddlespeed;
           }
            break;
        case(paddle1down):
           if(paddle1.y<gameheight-paddle1.height){
            paddle1.y+=paddlespeed;
           }
        break;
        case(paddle2up):
           if(paddle2.y>0){
              paddle2.y-=paddlespeed;
           }
        break;
        case(paddle2down):
          if(paddle2.y<gameheight-paddle2.height){
            paddle2.y+=paddlespeed;
          }
            break;
    }

};
function createball(){
    ballspeed=1;
    if(Math.round(Math.random())==1){
        ballxdirection=1;
    }
    else{
        ballxdirection=-1;
    }
    if(Math.round(Math.random())==1){
        ballydirection=1;
    }
    else{
        ballydirection=-1;
    }
    ballx=gamewidth/2;
    bally=gameheight/2;
    drawball(ballx,bally);
};
function moveball(){
    ballx+=(ballspeed*ballxdirection);
    bally+=(ballspeed*ballydirection);
};
function drawball(ballx,bally){
    context.fillStyle=ballcolor;
    context.strokeStyle=ballbordercolor;
    context.linewidth=2;
    context.beginPath();
    context.arc(ballx,bally,ballradius,0,2*Math.PI);
    context.stroke();
    context.fill();
}
function checkcollision(){
    if(bally<=0+ballradius){
        ballydirection*=-1;
    }
    if(bally>=gameheight-ballradius){
        ballydirection*=-1;
    }
    if(ballx<=0+ballradius){
        player2+=1;
        updatescore();
        createball();
        return;
    }
    if(ballx>=gamewidth){
        player1+=1;
        updatescore();
        createball();
        return;
    }
    if(ballx<=(paddle1.x+paddle1.width+ballradius)){
        if(bally>paddle1.y && bally<paddle1.y+paddle1.height){
            ballx=(paddle1.x+paddle1.width+ballradius);
            ballxdirection*=-1;
            ballspeed+=0.5;
        }
    }
    if(ballx>=(paddle2.x-ballradius)){
        if(bally>paddle2.y && bally<paddle2.y+paddle2.height){
            ballx=paddle2.x-ballradius;
            ballxdirection*=-1;
            ballspeed+=0.5;
        }
    }

};
function updatescore(){
    score.textContent=`${player1} : ${player2}`;
};
function resetgame(){
    player1=0;
    player2=0;
    paddle1={
        width:25,
        height:100,
        x:0,
        y:0
    };
    paddle2={
        width:25,
        height:100,
        x:gamewidth-25,
        y:gameheight-100 
    };
    ballspeed=1;
    ballx=0;
    bally=0;
    ballxdirection=0;
    ballydirection=0;
    gamerunning=false;
    updatescore();
    clearInterval(intervalid);
};
function displayWinner() {
    clearboard();
    context.fillStyle = "white";
   context.font = "30px Arial";
    if (player1 >= 10) {
        context.fillText("Player 1 Wins!", gamewidth / 2 - 100, gameheight / 2);
    } else {
        context.fillText("Player 2 Wins!", gamewidth / 2 - 100, gameheight / 2);
    }
}
