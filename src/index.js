import fs      from 'fs';
import winston from 'winston';
import sha1    from 'sha1';

module.exports = class MicroCache {

  constructor(path, logLevel = 'info', ext = '') {
    this.path = path;
    this.fileExt = ext;
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

  _file(name) {
    return this.path + sha1(name) + this.fileExt;
  }

  read(name) {
    let file = this._file(name);
    try {
      this.log.debug(`reading ${file}`);
      fs.accessSync(file, fs.F_OK);
      return fs.readFileSync(file, 'utf8');
    } catch (error) {
      return;
    }
  }

  write(name, content, replace = false) {
    let file = this._file(name);
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

  remove(name) {
    this.log.debug(`deleting ${this._file(name)}`);
    try {
      fs.unlinkSync(this._file(name));
      return true;
    } catch (error) {
      return false;
    }
  }
};
