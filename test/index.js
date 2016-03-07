import chai from 'chai';
import bunyan from 'bunyan';
import PrettyStream from 'bunyan-prettystream';
import microCache from '../src/index'

global.expect = chai.expect;

// Bunyan stuff
let prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);
let logger = bunyan.createLogger({
  name: "micro-cache",
  streams: [{
    level: 'trace',
    type: 'raw',
    stream: prettyStdOut
  }]
});

let testFile = { 
  name: 'scooby-snacks',
  data: 'Ruh-roh, Raggy'
}

describe('Cache', function() {

  beforeEach(() => {
    this.cache = new microCache('test/cache/', logger);
  });

  afterEach(() => {
    this.cache.remove(testFile.name);
  });

  describe('Write new', () => {
    it('should save data to the cache and overwrite existing', () => {
      let wrote = this.cache.write(testFile.name, testFile.data);
      expect(wrote).to.equal(true);
    });
  });

  describe('Write existing', () => {
    it('should save data to the cache only for new files', () => {
      let wrote = this.cache.write(testFile.name, testFile.data);
      wrote = this.cache.write(testFile.name, testFile.data, true);
      expect(wrote).to.equal(true);
    });
  });

  describe('Read', () => {
    it('should read data from the cache', () => {
      this.cache.write(testFile.name, testFile.data, true);
      let data = this.cache.read(testFile.name);
      expect(data).to.equal(testFile.data);
    });
  });

  describe('Remove', () => {
    it('should remove files from the cache', () => {
      let wrote = this.cache.write(testFile.name, testFile.data);
      expect(wrote).to.equal(true);
      let deleted = this.cache.remove(testFile.name);
      expect(deleted).to.equal(true);
    });
  });
});
