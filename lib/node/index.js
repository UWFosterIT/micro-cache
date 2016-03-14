'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _sha = require('sha1');

var _sha2 = _interopRequireDefault(_sha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function MicroCache(path) {
    var logLevel = arguments.length <= 1 || arguments[1] === undefined ? 'info' : arguments[1];
    var ext = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

    _classCallCheck(this, MicroCache);

    this.path = path;
    this.fileExt = ext;
    _winston2.default.loggers.add('micro-cache', {
      console: {
        colorize: true,
        label: 'micro-cache',
        level: logLevel,
        prettyPrint: true
      }
    });

    this.log = _winston2.default.loggers.get('micro-cache');
  }

  _createClass(MicroCache, [{
    key: '_file',
    value: function _file(name) {
      return this.path + (0, _sha2.default)(name) + this.fileExt;
    }
  }, {
    key: 'read',
    value: function read(name) {
      var file = this._file(name);
      try {
        this.log.debug('reading ' + file);
        _fs2.default.accessSync(file, _fs2.default.F_OK);
        return _fs2.default.readFileSync(file, 'utf8');
      } catch (error) {
        return;
      }
    }
  }, {
    key: 'write',
    value: function write(name, content) {
      var replace = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      var file = this._file(name);
      this.log.debug('writing ' + file);
      var flags = replace ? 'w+' : 'wx';
      try {
        _fs2.default.writeFileSync(file, content, 'UTF-8', { 'flags': flags });
        return true;
      } catch (error) {
        this.log.debug('unable to save to the cache for ' + file);
        this.log.debug(error);
        throw error;
      }
    }
  }, {
    key: 'remove',
    value: function remove(name) {
      this.log.debug('deleting ' + this._file(name));
      try {
        _fs2.default.unlinkSync(this._file(name));
        return true;
      } catch (error) {
        return false;
      }
    }
  }]);

  return MicroCache;
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLE9BQU8sT0FBUDtBQUVFLFdBRnFCLFVBRXJCLENBQVksSUFBWixFQUErQztRQUE3QixpRUFBVyxzQkFBa0I7UUFBViw0REFBTSxrQkFBSTs7MEJBRjFCLFlBRTBCOztBQUM3QyxTQUFLLElBQUwsR0FBWSxJQUFaLENBRDZDO0FBRTdDLFNBQUssT0FBTCxHQUFlLEdBQWYsQ0FGNkM7QUFHN0Msc0JBQVEsT0FBUixDQUFnQixHQUFoQixDQUFvQixhQUFwQixFQUFtQztBQUNqQyxlQUFTO0FBQ1Asa0JBQWEsSUFBYjtBQUNBLGVBQWEsYUFBYjtBQUNBLGVBQWEsUUFBYjtBQUNBLHFCQUFhLElBQWI7T0FKRjtLQURGLEVBSDZDOztBQVk3QyxTQUFLLEdBQUwsR0FBVyxrQkFBUSxPQUFSLENBQWdCLEdBQWhCLENBQW9CLGFBQXBCLENBQVgsQ0FaNkM7R0FBL0M7O2VBRnFCOzswQkFpQmYsTUFBTTtBQUNWLGFBQU8sS0FBSyxJQUFMLEdBQVksbUJBQUssSUFBTCxDQUFaLEdBQXlCLEtBQUssT0FBTCxDQUR0Qjs7Ozt5QkFJUCxNQUFNO0FBQ1QsVUFBSSxPQUFPLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBUCxDQURLO0FBRVQsVUFBSTtBQUNGLGFBQUssR0FBTCxDQUFTLEtBQVQsY0FBMEIsSUFBMUIsRUFERTtBQUVGLHFCQUFHLFVBQUgsQ0FBYyxJQUFkLEVBQW9CLGFBQUcsSUFBSCxDQUFwQixDQUZFO0FBR0YsZUFBTyxhQUFHLFlBQUgsQ0FBZ0IsSUFBaEIsRUFBc0IsTUFBdEIsQ0FBUCxDQUhFO09BQUosQ0FJRSxPQUFPLEtBQVAsRUFBYztBQUNkLGVBRGM7T0FBZDs7OzswQkFLRSxNQUFNLFNBQTBCO1VBQWpCLGdFQUFVLHFCQUFPOztBQUNwQyxVQUFJLE9BQU8sS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFQLENBRGdDO0FBRXBDLFdBQUssR0FBTCxDQUFTLEtBQVQsY0FBMEIsSUFBMUIsRUFGb0M7QUFHcEMsVUFBSSxRQUFRLFVBQVUsSUFBVixHQUFpQixJQUFqQixDQUh3QjtBQUlwQyxVQUFJO0FBQ0YscUJBQUcsYUFBSCxDQUFpQixJQUFqQixFQUF1QixPQUF2QixFQUFnQyxPQUFoQyxFQUF5QyxFQUFDLFNBQVMsS0FBVCxFQUExQyxFQURFO0FBRUYsZUFBTyxJQUFQLENBRkU7T0FBSixDQUdFLE9BQU8sS0FBUCxFQUFjO0FBQ2QsYUFBSyxHQUFMLENBQVMsS0FBVCxzQ0FBa0QsSUFBbEQsRUFEYztBQUVkLGFBQUssR0FBTCxDQUFTLEtBQVQsQ0FBZSxLQUFmLEVBRmM7QUFHZCxjQUFNLEtBQU4sQ0FIYztPQUFkOzs7OzJCQU9HLE1BQU07QUFDWCxXQUFLLEdBQUwsQ0FBUyxLQUFULGVBQTJCLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBM0IsRUFEVztBQUVYLFVBQUk7QUFDRixxQkFBRyxVQUFILENBQWMsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFkLEVBREU7QUFFRixlQUFPLElBQVAsQ0FGRTtPQUFKLENBR0UsT0FBTyxLQUFQLEVBQWM7QUFDZCxlQUFPLEtBQVAsQ0FEYztPQUFkOzs7O1NBbkRpQjtHQUF2QiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyAgICAgIGZyb20gJ2ZzJztcbmltcG9ydCB3aW5zdG9uIGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IHNoYTEgICAgZnJvbSAnc2hhMSc7XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgTWljcm9DYWNoZSB7XG5cbiAgY29uc3RydWN0b3IocGF0aCwgbG9nTGV2ZWwgPSAnaW5mbycsIGV4dCA9ICcnKSB7XG4gICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICB0aGlzLmZpbGVFeHQgPSBleHQ7XG4gICAgd2luc3Rvbi5sb2dnZXJzLmFkZCgnbWljcm8tY2FjaGUnLCB7XG4gICAgICBjb25zb2xlOiB7XG4gICAgICAgIGNvbG9yaXplOiAgICB0cnVlLFxuICAgICAgICBsYWJlbDogICAgICAgJ21pY3JvLWNhY2hlJyxcbiAgICAgICAgbGV2ZWw6ICAgICAgIGxvZ0xldmVsLFxuICAgICAgICBwcmV0dHlQcmludDogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5sb2cgPSB3aW5zdG9uLmxvZ2dlcnMuZ2V0KCdtaWNyby1jYWNoZScpO1xuICB9XG5cbiAgX2ZpbGUobmFtZSkge1xuICAgIHJldHVybiB0aGlzLnBhdGggKyBzaGExKG5hbWUpICsgdGhpcy5maWxlRXh0O1xuICB9XG5cbiAgcmVhZChuYW1lKSB7XG4gICAgbGV0IGZpbGUgPSB0aGlzLl9maWxlKG5hbWUpO1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmxvZy5kZWJ1ZyhgcmVhZGluZyAke2ZpbGV9YCk7XG4gICAgICBmcy5hY2Nlc3NTeW5jKGZpbGUsIGZzLkZfT0spO1xuICAgICAgcmV0dXJuIGZzLnJlYWRGaWxlU3luYyhmaWxlLCAndXRmOCcpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgd3JpdGUobmFtZSwgY29udGVudCwgcmVwbGFjZSA9IGZhbHNlKSB7XG4gICAgbGV0IGZpbGUgPSB0aGlzLl9maWxlKG5hbWUpO1xuICAgIHRoaXMubG9nLmRlYnVnKGB3cml0aW5nICR7ZmlsZX1gKTtcbiAgICBsZXQgZmxhZ3MgPSByZXBsYWNlID8gJ3crJyA6ICd3eCc7XG4gICAgdHJ5IHtcbiAgICAgIGZzLndyaXRlRmlsZVN5bmMoZmlsZSwgY29udGVudCwgJ1VURi04JywgeydmbGFncyc6IGZsYWdzfSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5sb2cuZGVidWcoYHVuYWJsZSB0byBzYXZlIHRvIHRoZSBjYWNoZSBmb3IgJHtmaWxlfWApO1xuICAgICAgdGhpcy5sb2cuZGVidWcoZXJyb3IpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlKG5hbWUpIHtcbiAgICB0aGlzLmxvZy5kZWJ1ZyhgZGVsZXRpbmcgJHt0aGlzLl9maWxlKG5hbWUpfWApO1xuICAgIHRyeSB7XG4gICAgICBmcy51bmxpbmtTeW5jKHRoaXMuX2ZpbGUobmFtZSkpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn07XG4iXX0=