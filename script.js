const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard =false;
let firstCard,secondCard;
let matchCounter=0


function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;
    this.classList.add('flip');
    if(!hasFlippedCard){
        hasFlippedCard=true;
        firstCard=this;
        return;
    }
    hasFlippedCard=false;
    secondCard=this;
    checkForMatch();
}

function checkForMatch(){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework
    isMatch ? disableCards() : unflipCards();
}

function disableCards(){
    firstCard.removeEventListener('click',flipCard)
    secondCard.removeEventListener('click',flipCard)
    matchCounter+=2
    resetBoard();
}

function unflipCards(){
    lockBoard=true;
    setTimeout(()=>{
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        resetBoard();
    },1200)
}

function resetBoard(){
    [hasFlippedCard,lockBoard]=[false,false]
    [firstCard,secondCard]=[null,null]
    if(matchCounter==(cards.length)){
        window.alert("Congratulations!! You won...");
    }
}

(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()*16);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click',flipCard))