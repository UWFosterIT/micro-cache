const { expect } = require('chai');
const MicroCache = require('../src/index');

const testFile = {
  name: 'scooby-snacks',
  data: 'Ruh-roh, Raggy',
};

const level = process.env.LOG_LEVEL || 'info';

describe('Cache', () => {
  beforeEach(() => {
    this.cache = new MicroCache('test/cache/', level, '.json');
  });

  afterEach(() => {
    this.cache.remove(testFile.name);
  });

  describe('Write new', () => {
    it('should save data to the cache and overwrite existing', () => {
      const wrote = this.cache.write(testFile.name, testFile.data);
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
      const data = this.cache.read(testFile.name);
      expect(data).to.equal(testFile.data);
    });
  });

  describe('Read Non-existent file', () => {
    it('should not error', () => {
      const data = this.cache.read(testFile.name);
      expect(data).to.equal(undefined);
    });
  });

  describe('Remove', () => {
    it('should remove files from the cache', () => {
      const wrote = this.cache.write(testFile.name, testFile.data);
      expect(wrote).to.equal(true);
      const deleted = this.cache.remove(testFile.name);
      expect(deleted).to.equal(true);
    });
  });
});
