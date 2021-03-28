// fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
//   .then(res => res.json())
//   .then(data => initialize(data))
//   .catch(err => console.log("Rest Countries fetch Error:", err));

const prev_btn = document.getElementById('prev_btn');
const present_btn = document.getElementById('present_btn');
const prev_card = document.getElementById('prev_card');
const present_card = document.getElementById('present_card');

// prev_btn.addEventListener('click', getRandomCat);
present_btn.addEventListener('click', getRandomCard);

//name of previous card
const prev_names = document.getElementById('prev_names');
const present_names = document.getElementById('present_names');

//shuffel
const btn_shuf = document.getElementById('btn-shuf');
btn_shuf.addEventListener('click',getCardsShuffel);

//restart 
prev_btn.addEventListener('click', restart);

//draw all cards
const btn_draw =document.getElementById('btn-draw');
btn_draw.addEventListener('click',getDrawCards);

// unique deck id for new deck cards
var deck_id="";

// card number
var remaining_cards = 52;

//cards data
var cards_data;
var current_card_number = 0;

// Execution starts her
getStartGame();
console.log(deck_id);


function getRandomCard() {
    if(present_card.innerHTML === "Random card Placeholder"){
    prev_card.innerHTML = "Start the Game" ;
    }else{
        prev_card.innerHTML = present_card.innerHTML;
        prev_names.innerHTML = present_names.innerHTML;
    }
    
    present_card.innerHTML = `<img src=${cards_data.cards[current_card_number].image} alt="card" />`;
    present_names.innerHTML = `<p>Value: ${cards_data.cards[current_card_number].value}  </p>` ;
    present_names.innerHTML +=`<p>Suit: ${cards_data.cards[current_card_number].suit}  </p>`;

    if( current_card_number >0){
        snaps.innerHTML ='';
        if(cards_data.cards[current_card_number].value === cards_data.cards[current_card_number-1].value ){
            // snap_val = document.getElementById('snap_val')
            snaps.innerHTML = '<p>SNAP VALUE! </p>';

        }

        if(cards_data.cards[current_card_number].suit === cards_data.cards[current_card_number-1].suit ){
            // snap_suit = document.getElementById('snap_suit')

            snaps.innerHTML+= '<p>SNAP SUIT!</p>';            
        }
    }
    if(current_card_number== 51){
        // remove draw cards button
        document.getElementById('present_btn').style.visibility="hidden";

        // get summary
        getSummary();

    }
    current_card_number = current_card_number + 1;
    count.innerHTML = `<p>${current_card_number} / 52</p>`;

}



//shuffel function
function getCardsShuffel(){
    console.log('im inside');
    fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`)
		.then(res => res.json())
		.then(data => {
            console.log('shuffeled');
            alert('cards Shuffeled');
		});
    
}

//restart game
async function getStartGame(){
    // window.location.reload();
    current_card_number = 0;
    await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json())
	.then(data => {
            console.log('Game restarted');
            console.log(data);
            deck_id = data["deck_id"];
        });
        present_card.innerHTML = "Random card Placeholder";
        prev_card.innerHTML = "Start the Game" ;


    get52CardsDataFromAPI();
}

function restart()
{
    window.location.reload();
    getStartGame();
}

async function get52CardsDataFromAPI()
{
    await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=52`)
    .then(res => res.json())
    .then(data => {
        cards_data = data;
        console.log(cards_data);

    })
}

//Draw all cards
function getDrawCards(){

        fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${remaining_cards}`)
		.then(res => res.json())
		.then(data => {
            // present_card.innerHTML = `<img src=${data.cards[0].image} alt="card" />`;
            // console.log(data.cards[0].value);
            // present_names.innerHTML = `<p>Value: ${data.cards[0].value}  </p>` ;
            // present_names.innerHTML +=`<p>Suit: ${data.cards[0].suit}  </p>`;
            console.log('all cards are drawn');
        });
        document.getElementById('present_btn').style.visibility="hidden";
        getSummary();
        count.innerHTML = `<p>52 / 52</p>`;

         

    
}

//summary
function getSummary(){
    cards_data.cards.forEach(element => console.log(element));

    let total_value_matches = 0;
    let total_suit_matches = 0;

    for (var i = 0; i < cards_data.cards.length-1; i++) {
        if(cards_data.cards[i].value === cards_data.cards[i+1].value ){
            total_value_matches = total_value_matches +1;

        }

        if(cards_data.cards[i].suit === cards_data.cards[i+1].suit ){
            total_suit_matches = total_suit_matches +1;        
        }
      }
      //write innerHtml
       
      var summary = document.getElementById('summary');
      summary.innerHTML = `<p>Value matches : ${total_value_matches} and Suit matches:${total_suit_matches} </p>`;
    //   document.getElementById('summary').style.visibility= "visible";

}




