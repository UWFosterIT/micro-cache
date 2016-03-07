import fs from 'fs';
import winston from 'winston';

module.exports = class MicroCache {

  constructor(path, logLevel = 'info') {
    this.path = path;
    winston.loggers.add('micro-cache', {
      console: {
        colorize:    true,
        label:       'micro-cache',
        level:       logLevel,
        prettyPrint: true
      }
    });

    this.log = winston.loggers.get('micro-cache');
  }

  read(filename) {
    let file = this.path + filename;
    try {
      this.log.debug(`reading ${file}`);
      fs.accessSync(file, fs.F_OK);
      return fs.readFileSync(file, 'utf8');
    } catch (error) {
      return;
    }
  }

  write(filename, content, replace = false) {
    let file = this.path + filename;
    this.log.debug(`writing ${file}`);
    let flags = replace ? 'w+' : 'wx';
    try {
      fs.writeFileSync(file, content, 'UTF-8', {'flags': flags});
      return true;
    } catch (error) {
      this.log.debug(`unable to save to the cache for ${file}`);
      this.log.debug(error);
      throw error;
    }
  }

  remove(filename) {
    let file = this.path + filename;
    this.log.debug(`deleting ${file}`);
    try {
      fs.unlinkSync(file);
      return true;
    } catch (error) {
      return false;
    }
  }
};
