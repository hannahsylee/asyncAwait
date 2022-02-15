/** Command-line tool to generate Markov text. */
const fs = require('fs');
const markov = require("./markov");
const process = require('process');
const axios = require('axios');

function generateText(text){
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

// Reading a file
// #########################################################
function readPath(path){
    fs.readFile(path, 'utf8', function(err, data){
        if (err) {
          console.log(`Error reading ${path}: ${err}`);
          // a code other than zero
          process.exit(1)
        } else {
            generateText(data);
        }
    });
}

async function readURL(url){
    try {
        let response = await axios.get(url);
        generateText(response.data);
        // console.log(response.data);
    } catch (err) {
        console.log(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

let [method, path] = process.argv.slice(2);

if (method === "file"){
    readPath(path);
} else if (method === "url"){
    readURL(path);
} else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}

