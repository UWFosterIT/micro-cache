const fs = require('fs');

module.exports = class MicroCache {

  constructor(path) {
    this.path = path;
    // make sure cache path exists, throw error if not
  }

  read(query){
    // if exists, read it and return it
    console.log('reading ' + query);
    return;
    fs.readFile(query, "utf8", function(error, data) {
      console.log('file ' + data);
      console.log('error ' + error);
    });
  }

  write(filename, data){
    // save if not found
    console.log('writing ' + filename + ' to ' + data);
  }

  remove(fileName){
    // if exists, remove it
    console.log('cleaning ' + fileName);
  }

}
