const cards=document.querySelectorAll(".card");
let card_1,card_2;
let matched_card=0,flip=0,timeleft=60;
let disabledeck=false;


const timedisplay=document.getElementById("time");
const flipdisplay=document.getElementById("flipCount");


const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
let timer=null;
let timerRunning = false; // Track if timer is running

// Function to start the game
function startGame() {
    if (!timerRunning) {
        timerRunning = true;
        timer = setInterval(() => {
            if (timeleft > 0) {
                timeleft--;
                timedisplay.textContent = timeleft;
            } else {
                alert("Time's up! Try again.");
                shufflecard();
                clearInterval(timer);
            }
        }, 1000);
    }
}

// Function to reset the game
function resetGame() {
    timerRunning = false;
    timeleft = 60;
    timedisplay.textContent = timeleft;
    flip = 0;
    if (flipdisplay) flipdisplay.textContent = flip;
    shufflecard();
    clearInterval(timer); 
}

// Function to resume the game

// Attach event listeners to buttons
startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);

function flipcard(e){
    if(timerRunning){
    let clickedcard=e.target;
    if(clickedcard!=card_1 && !disabledeck){
         clickedcard.classList.add("flip");
         flip++;
         flipdisplay.textContent=flip;
    if(!card_1){
        return card_1=clickedcard;
    }
    card_2=clickedcard;
    disabledeck=true;
    
    let card_1img=card_1.querySelector(".back-view img").src;
    let card_2img=card_2.querySelector(".back-view img").src;
    matchcards(card_1img,card_2img);
}
}
}
function matchcards(img1,img2){
    if(img1==img2){
        matched_card++;
        if(matched_card==8){
            clearInterval(timer);
            setTimeout(()=>alert("you won!!"),500);
        setTimeout(()=>{
            return shufflecard();
        },1000);
    }
        card_1.removeEventListener("click",flipcard);
        card_2.removeEventListener("click",flipcard);
        card_1=card_2="";
        return disabledeck=false;
    }
    setTimeout(()=>{
    card_1.classList.add("shake");
    card_2.classList.add("shake");
},400)
setTimeout(()=>{
    card_1.classList.remove("shake","flip");
    card_2.classList.remove("shake","flip");
    card_1=card_2="";
    disabledeck=false;
},1200)
}
function shufflecard() {
    matched_card = 0;
    flip = 0;
    flipdisplay.textContent = flip;
    timeleft = 60;
    timedisplay.textContent = timeleft;
    card_1 = card_2 = "";
    clearInterval(timer); // Ensure the timer doesn't auto-start
    timer = null;
    timerRunning = false;

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `img-${arr[index]}.png`;
        card.addEventListener("click", flipcard);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    shufflecard(); // Start the game only after DOM is fully loaded
});

cards.forEach(card =>{
    card.addEventListener("click",flipcard);
});