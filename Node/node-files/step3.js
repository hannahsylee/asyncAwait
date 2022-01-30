const fs = require('fs');
const process = require('process');
const axios = require('axios');

function handleOutput(line, output){
    if (output){
        fs.writeFile(output, line, { encoding: 'utf8', flag: 'a' }, function(err){
            if (err) {
                console.log(`Couldn't write ${output}: ${err}`)
                process.exit(1)
            }
        });
    } else {
        console.log(line)
    }
}

// Reading a file
// #########################################################
function cat(path, output){
    fs.readFile(path, 'utf8', function(err, data){
        if (err) {
          console.log(`Error reading ${url}: ${err}`);
          // a code other than zero
          process.exit(1)
        } else {
            handleOutput(data, output);
        }
    });
}

async function webCat(url, output){
    try {
        let response = await axios.get(url);
        handleOutput(response.data, output);
    } catch (err) {
        console.log(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

let path;
let output;

if (process.argv[2] === '--out') {
    output = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.slice(0,4) === 'http') {
    webCat(path, output);
} else {
    cat(path, output);
}