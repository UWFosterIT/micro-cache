import chai from 'chai';
import config from './config';
import microCache from '../src/index'

global.expect = chai.expect;

describe('Cache', function() {

  beforeEach(() => {
    this.cache = new microCache(config.path);
  });

  afterEach(() => {
    // remove all the files
  });

  describe('Write', () => {
    it('should save data to the cache', (done) => {
      this.cache.write('filenameyo', 'test');
      expect(1).to.equal(2);
      done();
    });
  });

  describe('Read', () => {
    it('should read data from the cache', (done) => {
      this.cache.write('filenameyo', 'test');
      let data = this.cache.read('filenameyo');
      expect(1).to.equal(2);
      done();
    });
  });

  describe('Remove', () => {
    it('should remove files from the cache', (done) => {
      this.cache.write('filenameyo', 'test');
      this.cache.remove('uy');
      expect(1).to.equal(2);
      done();
    });
  });
});
