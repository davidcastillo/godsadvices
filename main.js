// Initialize Firebase
var config = {
  apiKey: "AIzaSyCmRixl7I1TONZsdCptpcHu4xVsBOMapX0",
  authDomain: "consejosdedios-af9b7.firebaseapp.com",
  databaseURL: "https://consejosdedios-af9b7.firebaseio.com",
  projectId: "consejosdedios-af9b7",
  storageBucket: "consejosdedios-af9b7.appspot.com",
  messagingSenderId: "116677503810"
};
firebase.initializeApp(config);

var modal = document.getElementById('simpleModal');
var SecondModal = document.getElementById('secondModal');
var ThirdModal = document.getElementById('thirdModal');
var closeBtn = document.getElementsByClassName('closeBtn1')[0];
var closeSecondModal = document.getElementById('closeSecondModal');
var closeThirdModal = document.getElementById('closeThirdModal');
var thanks = document.getElementById('thanks');


closeBtn.addEventListener('click', closeModal);
closeSecondModal.addEventListener('click', close2ndModal);
closeThirdModal.addEventListener('click', closethirdModal);

//Outside CLICK
window.addEventListener('click', clickOutside);

function openModal(){
  modal.style.display = 'block';
}

function openSecondModal(){
  SecondModal.style.display = 'block';
}

function openThirdModal(){
  ThirdModal.style.display = 'block';
}

function closeModal(){
  modal.style.display = 'none';
 // newCard.innerHTML = '';
}

function newSearch(){
  modal.style.display = 'none';
  newCard.innerHTML = '';
}

function close2ndModal(){
  SecondModal.style.display = 'none';
}

function closethirdModal(){
  ThirdModal.style.display = 'none';
  newCard.innerHTML = '';
}

function clickOutside(y){
  if(y.target == modal){
  modal.style.display = 'none';
  }
};

var newCard = document.getElementById('david');
let keywordsArray = [];
// let test = [];

function getInputUser(){
  var input = document.getElementById('field').value.toLowerCase();
  let cardValue;
  let results;
  let newArrayOfKeywords = [];
  //fetching Cards from Firebase
  var card = firebase.database().ref('cards');
  card.on('value', function (data){
    keywordsArray = [];
    cardValue =  data.val();
    for(var i = 0; i< cardValue.length; i++){
      for(var j = 0; j < cardValue[i].cardkeywords.length; j++){
        // test.push(cardValue[i].cardkeywords[j]);
        var eachKeyword = cardValue[i].cardkeywords[j];

        newArrayOfKeywords.push(eachKeyword);
        //selecting the correct card if includes the keyword given
        if(cardValue[i].cardkeywords[j].includes(input)){
          keywordsArray.push(cardValue[i]);
          cardKey = Object.keys(cardValue)[i]
        };
      };
    };
    var index = newArrayOfKeywords.indexOf(input);
    if(index !== -1){
      console.log('que si');
      console.log(newArrayOfKeywords);
      askedCard();
    }else{
      console.log('que no');
      openThirdModal()
    }
  })
};


function askedCard(){
  newCard.innerHTML = '';
  for(var f = 0; f < keywordsArray.length; f++){
  newCard.innerHTML +=
  `<div class="card">
      <div class="card-body">
       <h4 class="card-title">${keywordsArray[f].cardtitle}</h4>
       <p class="card-text">${keywordsArray[f].cardtext}</p>
      </div>
      <div class="d-flex justify-content-between align-items-center">
      <ul class="list-group test">`
           function createbuttonx(){
             for(var k = 0; k < keywordsArray[f].cardpassages.length; k++){
                // 1. Create the button
                var button = document.createElement("a");
                button.innerHTML += keywordsArray[f].cardpassages[k].title;
                button.classList.add('list-group-item');
                button.classList.add('list-group-item-action');
                button.classList.add('text-center');
                button.classList.add('btn-passage');
                button.setAttribute('id', keywordsArray[f].cardpassages[k].passage );
                button.setAttribute('onclick', 'this.blur(); getPassage(this); openModal(); addTitleToCard(this);');
                // 2. Append to the UL
                var body = document.getElementsByTagName("ul")[f+1];
                body.appendChild(button);
              };
            };
            createbuttonx();
          `</ul>
        </div>
      </div>
    </div>`;
  }
  setTimeout(getIndextwo, 1000);
};



//Fetching cards from Firebase and Creating them in the DOM
function createCard(){
  newCard.innerHTML = '';
  //fetching Cards from Firebase
  var card = firebase.database().ref('cards');
  card.on('value', function (data){
    //Creating Cards Dynamically
    var cardValue =  data.val()
    for(var i =0; i< cardValue.length; i++){
      newCard.innerHTML +=
      `<div class="card">
          <div class="card-body">
          <h4 class="card-title">${cardValue[i].cardtitle}</h4>
          <p class="card-text">${cardValue[i].cardtext}</p>
          </div>
        <div class="d-flex justify-content-between align-items-center">
        <ul class="list-group test">`
       //Creating Passages of each card
       function createbutton(){
         for(var j = 0; j < cardValue[i].cardpassages.length; j++){
            // 1. Create the button
            var button = document.createElement("a");
            button.innerHTML += cardValue[i].cardpassages[j].title;
            button.classList.add('list-group-item');
            button.classList.add('list-group-item-action');
            button.classList.add('text-center');
            button.classList.add('btn-passage');
            button.setAttribute('id', cardValue[i].cardpassages[j].passage );
            button.setAttribute('data-clicked', cardValue[i].cardpassages[j].timesClicked );
            button.setAttribute('data-key', cardValue[i].cardpassages[j].index);
            button.setAttribute('onclick', 'this.blur(); getPassage(this); openModal(); addTitleToCard(this);');
            // 2. Append to the UL
            var body = document.getElementsByTagName("ul")[i+1];
            body.appendChild(button);
          };
        };
      createbutton();
     `</ul>
      </div>
      </div>`;
    };
  });
  setTimeout(getIndex, 1000);
};




//Declaring variables where the card and the button clicked index will be stored
var cardKey = 0;
var buttonKey = 0;

//Funcion to get the card and the button clicked index to pass it to firebase
function getIndex(){
  var cards = document.getElementsByClassName('card');
  //geting the key of the card clicked
  for (var i = 0; i< cards.length; i++) {
    cards[i].addEventListener('mouseenter', function(i) {
      cardKey = i;
      console.log('You clicked card index ' + cardKey);
    }.bind(null, i));
    //geting the key of the button clicked
    for (var j = 0; j < cards[i].getElementsByClassName('btn-passage').length; j++) {
      cards[i].getElementsByClassName('btn-passage')[j].addEventListener('mouseenter', function(j) {
        buttonKey = j;
        console.log('You clicked button index ' + buttonKey);
      }.bind(null, j));
    }
  };
};

function getIndextwo(){
  var cards = document.getElementsByClassName('card');
  //geting the key of the card clicked
  for (var i = 0; i< cards.length; i++) {
    cards[i].addEventListener('mouseenter', function(i) {
      // cardKey = i;
      console.log('You clicked card index ' + cardKey);
    }.bind(null, i));
    //geting the key of the button clicked
    for (var j = 0; j < cards[i].getElementsByClassName('btn-passage').length; j++) {
      cards[i].getElementsByClassName('btn-passage')[j].addEventListener('mouseenter', function(j) {
        buttonKey = j;
        console.log('You clicked button index ' + buttonKey);
      }.bind(null, j));
    }
  };
};


//function to increment the number of clicks by 1
function saveInfirebase(){
  var dato = 0;
  //getting the timesClicked of the clicked card and button
  var fbCards = firebase.database().ref('cards/'+cardKey+'/cardpassages/'+ buttonKey);
  fbCards.on('value',incrementClickByOne);
  //function to increment the value of times clicked
  function incrementClickByOne(data){
    var f = data.val();
    dato = f.timesClicked;
    dato ++;
    //printing the number of times clicked in the modal
    var clickCounter = document.getElementById('clicksCounter');
    clickCounter.innerHTML = dato +" Personas";
    };
  //Sending the new value to firebase
  var clickAdded  = {'timesClicked' : dato};
  fbCards.update(clickAdded);
  //redering again the DOM to avoid data duplication
  newCard.innerHTML = '';
};


//Add title to each card
function addTitleToCard(title){
  var titleModal = document.getElementById('titleModal');
  titleModal.innerHTML = title.innerText;
};


// Getting the passage of each button clicked
function getPassage(buttonClicked){
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  //xhr.setRequestHeader("Access-Control-Allow-Origin", *);
  let passage = buttonClicked.id;
  const url = 'https://api.biblia.com/v1/bible/content/RVR60.txt.txt?passage='+ passage +'&style=fullyFormatted%NoFootnotes&&key=d3d4175e8b69d4a9ccb9620a86ce245b';
  xhr.onload = function(){
    if(xhr.readyState === XMLHttpRequest.DONE){
       document.getElementById('textVerse').innerHTML = xhr.response
     };
  };
  xhr.open('GET', url);
  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhr.send();
  };

//Script to make FB button work
document.getElementById('shareBtn').onclick = function() {
    console.log('this')
  FB.ui({
    method: 'share',
    mobile_iframe: true,
    href: 'https://developers.facebook.com/docs/',
  }, function(response){});
}
