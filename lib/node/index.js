'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');

module.exports = function () {
  function MicroCache(path) {
    _classCallCheck(this, MicroCache);

    this.path = path;
    // make sure cache path exists, throw error if not
  }

  _createClass(MicroCache, [{
    key: 'find',
    value: function find(query) {
      // if exists, read it and return it
      fs.readFile(query, "utf8", function (error, data) {
        console.log('file ' + data);
        console.log('error ' + error);
      });
    }
  }, {
    key: 'put',
    value: function put(filename, data) {
      // save if not found
    }
  }, {
    key: 'remove',
    value: function remove(fileName) {
      // if exists, remove it
    }
  }]);

  return MicroCache;
}();