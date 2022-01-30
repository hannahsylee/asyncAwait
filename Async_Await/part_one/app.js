const baseURL = "http://numbersapi.com";

// 1.
let favNum = 7;
async function getFavNumFacts() {
    let favNumData = await $.getJSON(`${baseURL}/${favNum}?json`);
    console.log(favNumData);
}

getFavNumFacts();

// 2.
let numbers = [1,2,3,4];
async function getNumberFacts() {
    let numberData = await $.getJSON(`${baseURL}/${numbers}?json`);
    console.log(numberData);
}

getNumberFacts();

// 3.
async function getFourFacts() {
    let facts = await Promise.all(
        Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNum}?json`))
    );
    facts.forEach(data => {
        $("body").append(`<p>${data.text}</p>`)
    });
}

getFourFacts();