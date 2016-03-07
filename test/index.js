import chai from 'chai';
import MicroCache from '../src/index';

global.expect = chai.expect;

let testFile = {
  name: 'scooby-snacks',
  data: 'Ruh-roh, Raggy'
};

let level = process.env.LOG_LEVEL || 'info';

describe('Cache', function () {

  beforeEach(() => {
    this.cache = new MicroCache('test/cache/', level);
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
