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
    //Clear the board, variables  and  arrays to start a new game .
    let parent = document.getElementById("main");
    let memoryBord = document.createElement("div");
    memoryBord.setAttribute("id", "memoryBord");
    memoryBord.setAttribute("class", "row deck");
    parent.appendChild(memoryBord);
    memoryBord.style.background = "linear-gradient(160deg, #02ccba 0%, #aa7ecd 100%)";
    memoryBord.style.boxShadow = "12px 15px 20px 0 rgba(46, 61, 73, 0.5)";
    document.getElementById("subject").style.display = "flex";
    document.getElementById("score").style.display = "flex";
    //let star = document.getElementsByTagName("li");
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
    document.getElementById("TryingNumber").innerHTML = number_Of_Card_Moving;
    // document.getElementById("starRating").innerHTML = number_Of_Star_Rating;
    shuffle(memoryCard);
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
//////////////////////////////////////// Move Card Counter and rating Function //////////////////////////////////
function moveCardCounter() {
    //increment the counter of card moving by 1
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
    }
}
///////////////////finction to remove the congratulation part/////////////////////
function removeCongratsElements() {
    let parent = document.getElementById("main");
    let child1 = document.getElementById("successImage");
    let child2 = document.getElementById("ratingText");
    let child3 = document.getElementById("resetBtn");
    if (child1 !== null && child2 !== null && child3 !== null) {
        parent.removeChild(child1);
        parent.removeChild(child2);
        parent.removeChild(child3);
    }
    //clear the star rating element
    document.getElementById("ratingStars").innerHTML = null;
    // generate a new board
    generateBord();
}
///////////////////////function to check for meomry cards///////////////////////
function checkMemeoryCardMatch(cardTagId, value) {
    if (cardValue.length == 0) {
        cardValue.push(value);
        cardTagIds.push(cardTagId);
        document.getElementById(cardTagIds[0]).className = "open show card fa fa-" + value + "";
        moveCardCounter();
    } else if (cardValue.length == 1) {
        cardValue.push(value);
        cardTagIds.push(cardTagId);
        moveCardCounter();
        //check if the two cards are identicals
        if (cardValue[0] == cardValue[1]) {
            cardMatching(cardTagIds);
        } else {
            cardUnMatching(cardTagIds);
        }
    } else { //if lenght more than 1
        cardTagIds = [];
        cardValue = [];
    }
}
/////////////Generte a new board "function" for "play again" button//////////////
function reset() {
    let parent = document.getElementById("main");
    let child = document.getElementById("memoryBord");
    parent.removeChild(child);
    //   let starParent = document.getElementById("ratingStars");
    document.getElementById("ratingStars").innerHTML = null;

    // for (let i = 0; i < starParent.length; i++) {
    //     starParent.removeChild(starParent[i])
    // }
    // star[i].classList.add("fa-star-o");
    // star[i].style.visibility = "collapse";

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
            if (starColor.style.color === "rgb(255, 108, 0)") {
                number_Of_Star_Rating++;
            }
        }
        setTimeout(function() {
            document.getElementById("subject").style.display = "none";
            document.getElementById("score").style.display = "none";
            let parent = document.getElementById("main");
            let child = document.getElementById("memoryBord");
            parent.removeChild(child);
            document.getElementById("ratingStars").innerHTML = null;
            document.getElementById('main').innerHTML += '<div class="row" id="successImage"><section class="col"><img src="img/well.jpg" alt="success" id="successImage"></section></div>' +
                '<div class="row" id="ratingText"><section class="col"> <h5 id="subject_id" >Congratulations! You won!</h5><p id="subject_id" class="text-uppercase">with  ' + number_Of_Card_Moving + '  Moves and ' + number_Of_Star_Rating + ' star </p> <p id="subject_id" class="text-uppercase text_color">Woooow!</p></section></div>' +
                '<div class="row" id="resetBtn"><section class="col"> <input type = "button" class="btn btn-success" id="restartbtn"  value="Play again!" onclick="removeCongratsElements()"/></section></div>'
        }, 500);
    }
}
/////////No Matching Between 2 Cards function//////////
function cardUnMatching(cardIds) {
    document.getElementById(cardIds[0]).classList.remove("show", "open");
    document.getElementById(cardIds[0]).classList.add("no_match");
    document.getElementById(cardIds[1]).classList.add("no_match");
    let s1 = cardIds[0];
    let s2 = cardIds[1];
    cardTagIds = [];
    cardValue = [];
    setTimeout(function() {
        document.getElementById(s1).classList.remove("no_match");
        document.getElementById(s2).classList.remove("no_match");
    }, 500);
}