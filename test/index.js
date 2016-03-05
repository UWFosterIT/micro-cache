import chai from 'chai';
import bunyan from 'bunyan';
import PrettyStream from 'bunyan-prettystream';
import config from './config';
import microCache from '../src/index'

global.expect = chai.expect;

let prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);
config.logger = bunyan.createLogger({
  name: "micro-cache",
  streams: [{
    level: 'debug',
    type: 'raw',
    stream: prettyStdOut
  }]
});

describe('Cache', function() {

  beforeEach(() => {
    this.cache = new microCache(config.path, config.logger);
  });

  afterEach(() => {
    // remove all the files
  });

  describe('Write', () => {
    it('should save data to the cache', () => {
      this.cache.write('filenameyo', 'test');
      expect(1).to.equal(2);
    });
  });

  describe('Read', () => {
    it('should read data from the cache', () => {
      this.cache.write('filenameyo', 'test');
      let data = this.cache.read('filenameyo');
      expect(1).to.equal(2);
    });
  });

  describe('Remove', () => {
    it('should remove files from the cache', () => {
      this.cache.write('filenameyo', 'test');
      this.cache.remove('uy');
      expect(1).to.equal(2);
    });
  });
});
