/*
 * Create a list that holds all of your cards
 */
let winnerCounter = 0;
let deck = document.getElementById('deck');
let myStar = document.querySelector('.rating');
let score = document.querySelector('.score');
const symbols = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'];

let moveCounter = 0;
const counter = document.querySelector('.moves');
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

let cardOne = "";
let cardHolderOne = "";
let cardTwo = "";
let cardHolderTwo = "";
let starCounter = 0;

function matchCard(e) {


    console.log(e);
    if (cardHolderTwo !== "") return;

    if (this.classList.contains('match') || this.classList.contains('open') || this.classList.contains('showed')) return;

    this.classList.add('open');
    this.classList.add('showed');

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
            cardHolderOne = "";
            cardHolderTwo = "";
            cardOne = "";
            cardTwo = "";
            if (winnerCounter >= 8) {
                startRating();
                score.innerHTML = `With ${moveCounter} moves and ${starCounter} Starts Wooooo!`;
                $('#myModal').modal('show');

            }
        } else {

            console.log('dont match');
            setTimeout(function() {
                cardHolderOne.classList.remove('open');
                cardHolderOne.classList.remove('showed');
                cardHolderTwo.classList.remove('open');
                cardHolderTwo.classList.remove('showed');
                cardHolderOne = "";
                cardHolderTwo = "";
                cardOne = "";
                cardTwo = "";
            }, 1000);

        }
    }
}

function startRating() {
    console.log('did you fire');
    if (moveCounter < 20) {
        starCounter = 3;
        myStar.innerHTML = `<li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star"></i></li>`;
    } else if (moveCounter < 25) {
        starCounter = 2;
        myStar.innerHTML = `<li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star-o"></i></li>`
    } else if (moveCounter < 35) {
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

}

const restart = document.querySelector('.restart');

restart.addEventListener('mousedown', reloadPage);

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