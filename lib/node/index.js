'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _bunyan = require('bunyan');

var _bunyan2 = _interopRequireDefault(_bunyan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function MicroCache(path) {
    var logger = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    _classCallCheck(this, MicroCache);

    this.path = path;
    if (logger) {
      this.log = logger;
    } else {
      this.log = _bunyan2.default.createLogger({ name: "micro-cache" });
    }
  }

  _createClass(MicroCache, [{
    key: 'read',
    value: function read(filename) {
      var file = this.path + filename;
      try {
        this.log.trace('reading ' + file);
        _fs2.default.accessSync(file, _fs2.default.F_OK);
        return _fs2.default.readFileSync(file, "utf8");
      } catch (error) {
        return;
      }
    }
  }, {
    key: 'write',
    value: function write(filename, content) {
      var replace = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      var file = this.path + filename;
      this.log.trace('writing ' + file);
      var flags = replace ? 'w+' : 'wx';
      try {
        _fs2.default.writeFileSync(file, content, "UTF-8", { 'flags': flags });
        return true;
      } catch (error) {
        this.log.fatal('unable to save to the cache for ' + file);
        this.log.fatal(error);
        throw error;
      }
    }
  }, {
    key: 'remove',
    value: function remove(filename) {
      // don't return an error if you cant remove the file
      var file = this.path + filename;
      this.log.trace('deleting ' + file);
      try {
        _fs2.default.unlinkSync(file);
        return true;
      } catch (error) {
        return false;
      }
    }
  }]);

  return MicroCache;
}();