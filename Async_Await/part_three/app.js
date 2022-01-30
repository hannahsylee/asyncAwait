const baseURL = "https://pokeapi.co/api/v2";

// 1.
async function getData1(){
    let pokemonData = await $.getJSON(`${baseURL}/pokemon?limit=1000`);
    console.log(pokemonData);
}

getData1();

// 2.
async function getData2(){
    let data2 = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
    let random = [];
    for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * data2.results.length);
        let url = data2.results.splice(randomIdx, 1)[0].url;
        random.push(url);
    }
    let data = await Promise.all(
        random.map(url => $.getJSON(url))
    );
    data.forEach(p => console.log(p));
}

getData2();

// 3.
async function getData3() {
    let data3 = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
    let randomPokemonUrls = [];
    for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * data3.results.length);
        let url = data3.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
    }
    let pokemonData = await Promise.all(
        randomPokemonUrls.map(url => $.getJSON(url))
    );
    let speciesData = await Promise.all(
        pokemonData.map(p => $.getJSON(p.species.url))
    );
    descriptions = speciesData.map(d => {
        let descriptionObj = d.flavor_text_entries.find(
        entry => entry.language.name === "en"
        );
        return descriptionObj
        ? descriptionObj.flavor_text
        : "No description available.";
    });
    descriptions.forEach((desc, i) => {
        console.log(`${pokemonData[i].name}: ${desc}`);
    });
}

getData3();

// 4.
let $btn = $('button');
let $cardArea = $('#card-area');

$btn.click('on', async function(){
    $cardArea.empty();

    let data4 = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
    let randomPokemonUrls = [];
    for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * data4.results.length);
        let url = data4.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
    }

    let pokemonData = await Promise.all(
        randomPokemonUrls.map(url => $.getJSON(url))
    );
    let speciesData = await Promise.all(
        pokemonData.map(p => $.getJSON(p.species.url))
    );
    speciesData.forEach((d, i) => {
        let descriptionObj = d.flavor_text_entries.find(
        entry => entry.language.name === "en"
        );
        let description = descriptionObj ? descriptionObj.flavor_text : "No description available.";
        let name = pokemonData[i].name;
        let imgSrc = pokemonData[i].sprites.front_default;
        $cardArea.append(makePokemonHTML(name, imgSrc, description));
    });
});


function makePokemonHTML(name, imgSrc, description){
    return `
      <div class="card">
        <h1>${name}</h1>
        <img src=${imgSrc} />
        <p>${description}</p>
      </div>
    `;
};
