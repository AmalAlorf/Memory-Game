/*
 * Create a list that holds all of your cards
 */
var memoryCard = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'anchor', 'anchor', 'bolt', 'bolt', 'cube', 'cube', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb'];
//var memoryCard = ['diamond', 'diamond']; //Just for testing 
var cardValue = [];
var cardTagIds = [];
var number_Of_Card_Matching = 0;
var number_Of_Card_Moving = 0;
var number_Of_Star_Rating = 0;
var second = 0;
var minute = 0;
var interval;
var hasGameStarted = false; // use this variable to determine the starting time
var startingCardMoving = 0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
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

function generateBord() {
    //Reset the board, variables  and  arrays to start a new game .
    let timer = document.getElementById("timer");
    let parent = document.getElementById("main");
    let memoryBord = document.createElement("div");
    memoryBord.setAttribute("id", "memoryBord");
    memoryBord.setAttribute("class", "row deck");
    parent.appendChild(memoryBord);
    memoryBord.style.background = "linear-gradient(160deg, #02ccba 0%, #aa7ecd 100%)";
    memoryBord.style.boxShadow = "12px 15px 20px 0 rgba(46, 61, 73, 0.5)";
    document.getElementById("subject").style.display = "flex";
    document.getElementById("score").style.display = "flex";
    let star = document.getElementById("ratingStars");
    //add the stars(li) to (ul)
    for (i = 0; i < 3; i++) {
        star.innerHTML += '<li class="card fa fa-star"></li>'
    }
    cardTagIds = [];
    cardValue = [];
    number_Of_Card_Matching = 0;
    number_Of_Card_Moving = 0;
    number_Of_Star_Rating = 0;
    startingCardMoving = 0
    document.getElementById("TryingNumber").innerHTML = "Movings Card Number: " + number_Of_Card_Moving;
    //reset timer 
    second = 0;
    minute = 0;
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
    hasGameStarted = false;
    //reset gamer time
    gamertime = 0;
    // shuffling cards 
    shuffle(memoryCard);
    //Adding the cards to the board after shuffling cards
    addCardsToMemoryBoard(memoryCard)
}
//add Event to load the bord when the page is loading 
window.addEventListener("load", generateBord);

//////////////////////////////add Cards To Memory Board Function////////////////////////////////
function addCardsToMemoryBoard(memoryCard) {
    for (let i = 0; i < memoryCard.length; i++) {
        document.getElementById('memoryBord').innerHTML += '<section id="' + i + '" class="col-auto card fa fa-' + memoryCard[i] + '" onclick="checkMemeoryCardMatch(' + i + ',\'' + memoryCard[i] + '\')"></section>'
    }
}
////////////////////////Function to  start the time/////
function startingCardMovingCounter() {
    startingCardMoving++;
    if (startingCardMoving == 1) {
        startingCardMoving++;
        startTimer();
    }
}
//////////////////////////////////////// Move Card Counter and rating Function //////////////////////////////////
function moveCardCounter() {
    number_Of_Card_Moving++;
    document.getElementById("TryingNumber").innerHTML = number_Of_Card_Moving + " Moves";
    let star = document.getElementsByTagName("li");
    // setting rates based on moves
    if (number_Of_Card_Moving >= 7 && number_Of_Card_Moving < 12) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                star[i].className = "card fa fa-star-o";
                star[i].style.color = "#181819";
            } else {
                //change the calss name and the color of stars
                star[i].className = "card fa fa-star";
                star[i].style.color = "#ff6c00";
            }
        }
    } else if (number_Of_Card_Moving >= 12) {
        for (let i = 0; i < 3; i++) {
            if (i > 0) {
                star[i].className = "card fa fa-star-o";
                star[i].style.color = "#181819";
            } else {
                star[i].className = "card fa fa-star";
                star[i].style.color = "#ff6c00";
            }
        }
    } else {
        for (let i = 0; i < 3; i++) {
            star[i].className = "card fa fa-star";
            star[i].style.color = "#ff6c00";
        }
    }

}
///////////////////////function to check for meomry cards///////////////////////
function checkMemeoryCardMatch(cardTagId, value) {
    if (cardValue.length == 0) {
        cardValue.push(value);
        cardTagIds.push(cardTagId);
        hasGameStarted = true;
        startingCardMovingCounter();
        document.getElementById(cardTagIds[0]).className = "open disabled show card fa fa-" + value + "";
    } else if (cardValue.length == 1) {
        cardValue.push(value);
        cardTagIds.push(cardTagId);
        document.getElementById(cardTagIds[1]).className = "disabled card fa fa-" + value + "";
        //check if the two cards are identicals
        if (cardValue[0] == cardValue[1]) {
            cardMatching(cardTagIds);
        } else {
            cardUnMatching(cardTagIds);
            moveCardCounter();
        }
    } else { //if lenght more than 1
        cardTagIds = [];
        cardValue = [];
    }
}
/////////////Generte a new board refersh part //////////////
function reset() {
    let parent = document.getElementById("main");
    let child = document.getElementById("memoryBord");
    parent.removeChild(child);
    document.getElementById("ratingStars").innerHTML = null;
    generateBord();
}
/////////Card Matching Function//////////////
function cardMatching(cardIds) {
    number_Of_Card_Matching += 2;
    document.getElementById(cardIds[0]).classList.remove("show", "open");
    document.getElementById(cardIds[1]).classList.remove("show", "open");
    //Change the class to match class 
    document.getElementById(cardIds[0]).classList.add("match");
    document.getElementById(cardIds[1]).classList.add("match");
    cardTagIds = [];
    cardValue = [];
    if (number_Of_Card_Matching == memoryCard.length) {
        let star = document.getElementsByTagName("li");
        for (let i = 0; i < 3; i++) {
            let starColor = star[i];
            if (starColor.style.color == "rgb(255, 108, 0)") {
                number_Of_Star_Rating++;
            }
        }
        setTimeout(function() {
            congratulation();
        }, 100);
    }
}
/////////No Matching Between 2 Cards function//////////
function cardUnMatching(cardIds) {
    document.getElementById(cardIds[0]).classList.remove("show", "open");
    document.getElementById(cardIds[0]).classList.add("no_match");
    document.getElementById(cardIds[1]).classList.add("no_match");
    let card1 = cardIds[0];
    let card2 = cardIds[1];
    cardTagIds = [];
    cardValue = [];

    setTimeout(function() {

        document.getElementById(card1).classList.remove("disabled", "no_match");
        document.getElementById(card2).classList.remove("disabled", "no_match");
    }, 700);
}
//////////Function to start the timer of game ////////////////
function startTimer() {
    let timer = document.getElementById("timer");
    if (hasGameStarted == true) {
        interval = setInterval(function() {
            timer.innerHTML = minute + "mins " + second + "secs";
            second++;

            if (second == 60) {
                minute++;
                second = 0;
            }
        }, 1000);

    }
}
//////////show congratulations modal function//////////
function congratulation() {
    let memoryMode = document.getElementById("memoryMode");
    memoryMode.style.display = 'block';
    memoryMode.classList.add('show');
    clearInterval(interval);
    //Get the time,star rating and the number of moving and display them on the model
    let gamerTime = 0;
    gamerTime = document.getElementById("timer").innerHTML;
    document.getElementById("gamerTime").innerHTML = "Your Time : " + gamerTime;
    document.getElementById("noOfMoving").innerHTML = "Number of moving : " + number_Of_Card_Moving;
    document.getElementById("starRating").innerHTML = "Your Rating is : " + number_Of_Star_Rating + "  star";
    //the background color of the page becomes dark .
    $("#memoryMode").modal({ backdrop: "static" });
}
// for player to play Again 
// this function applied in tow case :
//1 . when the user press play again button on Model
//2 . when the user press close button on the model 
function playAgain() {
    //reset the background color of the page  .
    $("#memoryMode").modal({ backdrop: false });
    //The model will be hidden
    memoryMode.style.display = 'none';
    reset();
}

///////////////////////////////