let cards=document.querySelectorAll('.memory-card');
let movesOutput=document.querySelector('.moves-number');
let restartBtn=document.querySelector('.restart');
let startBtn=document.querySelector('.start');
let firstCard,secondCard;
let isCardFliped=false;
let lockBoard=true;
let movesCounter=0;
let match=0;

let outputMinutes=document.querySelector('.min');
let outputSeconds=document.querySelector('.second');
let outputTen=document.querySelector('.ten');

let mins=00;
let secs=00;
let tens=00;
let interval;

function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;
    this.classList.add('flip');
    if(!isCardFliped){
        isCardFliped=true;
        firstCard=this;
    }else{
        isCardFliped=false;
        secondCard=this;

        if(firstCard.dataset.name===secondCard.dataset.name){
            firstCard.removeEventListener('click',flipCard);
            secondCard.removeEventListener('click',flipCard);
            match++;
            resetBoard();
            if(match===6){
                clearInterval(interval)
            }
        }else{
            lockBoard=true;
            setTimeout(()=>{
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                lockBoard=false;
                resetBoard();
            },1500);    
        }
        movesCounter++;
        movesOutput.innerHTML=movesCounter;
    }  
}

function resetBoard(){
    firstCard=null;
    secondCard=null;
    isCardFliped=false;
    lockBoard=false;
}


function startTime(){
    tens++;
    if(tens<=9){
        outputTen.innerHTML='0' + tens;
    }
    if(tens>9){
        outputTen.innerHTML= tens;
    }
    if(tens>99){
        secs++;
        outputSeconds.innerHTML='0' + secs;
        tens=0;
        outputTen.innerHTML='0' + 0;
    }
    if(secs<=9){
        outputSeconds.innerHTML='0' + secs;
    }
    if(secs>9){
        outputSeconds.innerHTML= secs;
    }
    if(secs>59){
        mins++;
        outputMinutes.innerHTML='0' + mins;
        secs=0;
        outputSeconds.innerHTML='0' + 0;
    }
    if(mins>9){
        outputMinutes.innerHTML=mins;
    }
}

function shafleCards(){
    cards.forEach(card=>{
        let random=Math.floor(Math.random()*12);
        card.style.order=random;
    })
}
shafleCards()

cards.forEach(card=>card.addEventListener('click', flipCard));
restartBtn.addEventListener('click', ()=>{
    window.location.reload()
});
startBtn.addEventListener('click', ()=>{
    lockBoard=false;
    interval=setInterval(startTime, 10);
})