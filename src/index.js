/* eslint-disable security/detect-non-literal-fs-filename */
const fs = require('fs');
const winston = require('winston');
const sha1 = require('sha1');

module.exports = class MicroCache {
  constructor(path, logLevel = 'info', ext = '') {
    this.path = path;
    this.fileExt = ext;
    this.log = winston.createLogger({
      level: logLevel,
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.label({ label: 'micro-cache', message: true }),
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
      ],
    });
  }

  file(name) {
    return this.path + sha1(name) + this.fileExt;
  }

  read(name) {
    const file = this.file(name);
    try {
      this.log.debug(`reading ${file}`);
      fs.accessSync(file, fs.F_OK);
      return fs.readFileSync(file, 'utf8');
    } catch (error) {
      this.log.debug(`file not found: ${file}`);
      return undefined;
    }
  }

  write(name, content, replace = false) {
    const file = this.file(name);
    this.log.debug(`writing ${file}`);
    const flags = replace ? 'w+' : 'wx';
    try {
      fs.writeFileSync(file, content, 'UTF-8', { flags });
      return true;
    } catch (error) {
      this.log.debug(`unable to save to the cache for ${file}`);
      this.log.debug(error);
      throw error;
    }
  }

  remove(name) {
    this.log.debug(`deleting ${this.file(name)}`);
    try {
      fs.unlinkSync(this.file(name));
      return true;
    } catch (error) {
      return false;
    }
  }
};
