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
const name = document.getElementById('name');

// function getRandomCat() {
// 	fetch('https://deckofcardsapi.com/api/deck/pi5jm3qu3nuu/draw/?count=1')
// 		.then(res => res.json())
// 		.then(data => {
//             prev_card.innerHTML = `<img src=${data.cards[0].image} alt="cat" />`;
//             name.innerHTML = `${data.cards[0].value} of ${data.cards[0].suit}`;
// 		});
// }

// function getRandomDog() {
// 	fetch('https://random.dog/woof.json')
// 		.then(res => res.json())
// 		.then(data => {
// 			if(data.url.includes('.mp4')) {
// 				getRandomDog();
// 			}
// 			else {
// 				present_card.innerHTML = `<img src=${data.url} alt="dog" />`;
// 			}
// 		});
// }

function getRandomCard() {
    
	fetch('https://deckofcardsapi.com/api/deck/pi5jm3qu3nuu/draw/?count=1')
		.then(res => res.json())
		.then(data => {
            present_card.innerHTML = `<img src=${data.cards[0].image} alt="card" />`;
            console.log(data.cards[0].value);
            name.innerHTML = `<p>${data.cards[0].value} of ${data.cards[0].suit} </p>` ;
		});
}
