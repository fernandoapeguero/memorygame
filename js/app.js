/*
 * Create a list that holds all of your cards
 */

 let deck = document.querySelector('.deck');
 const cards = document.querySelectorAll('.card');
 const shuffleDeck =  shuffle(cards);
  while(deck.hasChildNodes()){

  	deck.removeChild(deck.firstChild);
  }


   for(let i = 0; i < shuffleDeck.length; i++){

       deck.appendChild(shuffleDeck[i]);
   }

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
	array.forEach(function(d){
		arr.push(d);
	});

    var currentIndex = array.length, temporaryValue, randomIndex;
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

   let openCards = [] ;
   let moveCounter = 0;

 function matchCard(){

     moveCounter++;

      this.classList.add('open');
  	  this.classList.add('show');
      openCards.push(this);

}

 const shuffleCards = document.querySelectorAll('.card');

 shuffleCards.forEach(card => card.addEventListener('click' , matchCard));
 console.log(shuffleCards);



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
