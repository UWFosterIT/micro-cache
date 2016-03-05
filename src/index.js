import fs from 'fs';
import bunyan from 'bunyan';

module.exports = class MicroCache {

  constructor(path, logger = null) {
    this.path = path;
    if (!logger) {
      this.log = bunyan.createLogger({name: "micro-cache"});
    } else {
      this.log = logger;
    }
    // make sure cache path exists: throw error if not
  }

  read(query){
    // if exists, read it and return it
    this.log.info(`reading ${query}`);
    return;
    fs.readFile(query, "utf8", function(error, data) {
      this.log.info(`file ${data}`);
      this.log.info(`error ${error}`);
    });
  }

  write(filename, data){
    // save if not found
    this.log.info(`writing ${filename} to ${data}`);
  }

  remove(filename){
    // if exists, remove it
    this.log.info(`cleaning ${filename}`);
  }

}
