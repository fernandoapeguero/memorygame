/*
 * Create a list that holds all of your cards
 */
const restart = document.querySelector('.restart');
const modalButton = document.querySelector('.btn');
const playerTimer = document.querySelector('.playerTimer');

restart.addEventListener('mousedown', reloadPage);
modalButton.addEventListener('click', reloadPage);

let winnerCounter = 0;
let moveCounter = 0;
let deck = document.getElementById('deck');
let myStar = document.querySelector('.rating');
let score = document.querySelector('.score');
const symbols = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'];

const counter = document.querySelector('.moves');


let cardOne = "";
let cardHolderOne = "";
let cardTwo = "";
let cardHolderTwo = "";
let starCounter = 0;
let timerBool = false;
let seconds = "";
let intervalTimer = "";
//setting up audio for match and don't match as well.
const matchSound = new Audio('audio/matcher.wav');
const wrongSound = new Audio('audio/wrong-buzzer.wav');
const winSound = new Audio('audio/tada.flac');
// setting volume so it does not sound to loud.
matchSound.volume = 0.2;
wrongSound.volume = 0.1;

reloadPage();



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    //console.log(typeof(array));
    let arr = [];
    array.forEach(function(d) {
        arr.push(d);
    });

    var currentIndex = array.length,
        temporaryValue, randomIndex;
    //var arr  = array.slice(0);
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = arr[currentIndex];
        //console.log(temporaryValue);
        arr[currentIndex] = arr[randomIndex];
        // console.log(array[currentIndex]);
        arr[randomIndex] = temporaryValue;
        //console.log(array[currentIndex]);
    }

    return arr;
}


//check to see if card are a match or not
function matchCard(e) {
    if (timerBool === false) {
        myTimer();
        timerBool = true;
    }
    //logic to check  if card have not been click to not created a double point or error in game
    if (cardHolderTwo !== "") return;
    if (this.classList.contains('match') || this.classList.contains('open') || this.classList.contains('showed')) return;

    this.classList.add('open');
    this.classList.add('showed');
    //here i check to see if the card is empty to check the first one or continue to the second card.
    console.log('still here');
    if (!cardOne) {
        cardOne = e.target.children[0].className;
        cardHolderOne = this;
    } else {
        moveCounter++;
        counter.innerHTML = moveCounter;
        cardTwo = e.target.children[0].className;
        cardHolderTwo = this;

        if (cardHolderOne.id === cardHolderTwo.id) {
            cardHolderTwo = "";
            cardTwo = "";
            return;
        }

        console.log(cardTwo);
        if (cardOne === cardTwo) {
            console.log('match');
            winnerCounter++;
            cardHolderOne.classList.add('match');
            cardHolderTwo.classList.add('match');
            cardHolderOne.classList.add('matching-card');
            cardHolderTwo.classList.add('matching-card');
            matchSound.currentTime = 0;
            matchSound.play();

            setTimeout(function() {
                cardHolderOne.classList.remove('matching-card');
                cardHolderTwo.classList.remove('matching-card');
                cardHolderOne = "";
                cardHolderTwo = "";
                cardOne = "";
                cardTwo = "";
            }, 500);


            if (winnerCounter >= 8) {
                winSound.play();
                score.innerHTML = `With ${moveCounter} moves ${starCounter} Starts and ${seconds} seconds ${moveCounter < 16 && seconds < 31 ? "Expert" : moveCounter < 20 && seconds < 35  ? "Good" : "Need Pratice" }`;
                $('#myModal').modal('show');
                clearInterval(intervalTimer);

            }
        } else {

            console.log('dont match');

            cardHolderOne.classList.add('not-matching');
            cardHolderTwo.classList.add('not-matching');
            wrongSound.currentTime = 0;
            wrongSound.play();

            setTimeout(function() {
                cardHolderOne.classList.remove('open');
                cardHolderOne.classList.remove('showed');
                cardHolderTwo.classList.remove('open');
                cardHolderTwo.classList.remove('showed');
                cardHolderOne.classList.remove('not-matching');
                cardHolderTwo.classList.remove('not-matching');
                cardHolderOne = "";
                cardHolderTwo = "";
                cardOne = "";
                cardTwo = "";
            }, 1000);


        }
    }
}

//setting up the start rating for the star number depending on the moves it took the player to finish the game
function startRating() {
    console.log('did you fire');
    if (moveCounter < 16 && seconds < 31) {
        starCounter = 3;
        myStar.innerHTML = `<li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star"></i></li>`;
    } else if (moveCounter < 20 && seconds < 36) {
        starCounter = 2;
        myStar.innerHTML = `<li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star-o"></i></li>`
    } else if (moveCounter < 25 && seconds > 41) {
        starCounter = 1;
        myStar.innerHTML = `<li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star-o"></i></li>
     <li><i class="fa fa-star-o"></i></li>`
    } else {
        starCounter = 0;
        myStar.innerHTML = `<li><i class="fa fa-star-o"></i></li>
     <li><i class="fa fa-star-o"></i></li>
     <li><i class="fa fa-star-o"></i></li>`
    }

}
// reload page
function reloadPage() {
    // sets values to 0 before starting and on reload click
    winnerCounter = 0;
    moveCounter = 0;
    counter.innerHTML = moveCounter;
    seconds = 0;
    playerTimer.innerHTML = " Timer : " + seconds;
    timerBool = false;
    // clearing the interval function i set to get each second
    clearInterval(intervalTimer);

    const shuffleCards = shuffle(symbols);
    let shuffleDeck = "";
    //creating the card that will be place in the deck
    for (let i = 0; i < shuffleCards.length; i++) {

        shuffleDeck += `<li class="card" id="${i}"><i class="fa fa-${shuffleCards[i]}"></i></li>`;

    }

    deck.innerHTML = shuffleDeck;
    // setting up event listener for each card to listen for any click
    const shuffled = document.querySelectorAll('.card');
    shuffled.forEach(card => card.addEventListener('mousedown', matchCard));

    myStar.innerHTML = `<li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star"></i></li>`;

}

function myTimer() {

    intervalTimer = setInterval(function() {
        startRating();
        seconds += 1;
        playerTimer.innerHTML = " Timer : " + seconds;
    }, 1000);

}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */