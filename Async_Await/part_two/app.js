const baseURL = "http://deckofcardsapi.com/api/deck";

// 1.

async function getCardData() {
    let deckData = await $.getJSON(`${baseURL}/new/draw`);
    let { suit, value } = deckData.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
}

getCardData();

// 2.
async function getCardData2() {
    let data1 = await $.getJSON(`${baseURL}/new/draw`);
    let firstCard = data1.cards[0];
    let deckId = data1.deck_id;
    let data2 = await $.getJSON(`${baseURL}/${deckId}/draw/`);
    let secondCard = data2.cards[0];
    [firstCard, secondCard].forEach(function(card){
        console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
    });
}

getCardData2();

// 3.
async function getCardData3() {
    let $btn = $('button');
    let $cardArea = $('#card-area');
    let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
    let deckId = deckData.deck_id;
    $btn.show().on('click', async function(){
        let cardData = await     $.getJSON(`${baseURL}/${deckId}/draw/`);
        let cardSrc = cardData.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        $cardArea.append(
            $('<img>', {
                src: cardSrc,
                css: {
                transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                }
            })
        );
        if (deckData.remaining === 0) $btn.remove();
    });
}

getCardData3();
