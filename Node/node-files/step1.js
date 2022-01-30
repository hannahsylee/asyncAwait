const fs = require('fs');
const process = require('process');

// Reading a file
// #########################################################
function cat(path){
    fs.readFile(path, 'utf8', function(err, data){
        if (err) {
          console.log(`Error reading ${path}: ${err}`);
          // a code other than zero
          process.exit(1)
        }
        console.log(data)
      })
}
// what does this mean? argv
cat(process.argv[2]);

