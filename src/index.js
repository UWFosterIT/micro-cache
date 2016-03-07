import fs from 'fs';
import bunyan from 'bunyan';

module.exports = class MicroCache {

  constructor(path, logger = null) {
    this.path = path;
    if (logger) {
      this.log = logger;
    } else {
      this.log = bunyan.createLogger({name: 'micro-cache'});
    }
  }

  read(filename) {
    let file = this.path + filename;
    try {
      this.log.trace(`reading ${file}`);
      fs.accessSync(file, fs.F_OK);
      return fs.readFileSync(file, 'utf8');
    } catch (error) {
      return;
    }
  }

  write(filename, content, replace = false) {
    let file = this.path + filename;
    this.log.trace(`writing ${file}`);
    let flags = replace ? 'w+' : 'wx';
    try {
      fs.writeFileSync(file, content, 'UTF-8', {'flags': flags});
      return true;
    } catch (error) {
      this.log.fatal(`unable to save to the cache for ${file}`);
      this.log.fatal(error);
      throw error;
    }
  }

  remove(filename) {
    let file = this.path + filename;
    this.log.trace(`deleting ${file}`);
    try {
      fs.unlinkSync(file);
      return true;
    } catch (error) {
      return false;
    }
  }
};
