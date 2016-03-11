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

    _classCallCheck(this, MicroCache);

    this.path = path;
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
    key: 'read',
    value: function read(filename) {
      var file = this.path + (0, _sha2.default)(filename);
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
    value: function write(filename, content) {
      var replace = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      var file = this.path + (0, _sha2.default)(filename);
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
    value: function remove(filename) {
      var file = this.path + (0, _sha2.default)(filename);
      this.log.debug('deleting ' + file);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLE9BQU8sT0FBUDtBQUVFLFdBRnFCLFVBRXJCLENBQVksSUFBWixFQUFxQztRQUFuQixpRUFBVyxzQkFBUTs7MEJBRmhCLFlBRWdCOztBQUNuQyxTQUFLLElBQUwsR0FBWSxJQUFaLENBRG1DO0FBRW5DLHNCQUFRLE9BQVIsQ0FBZ0IsR0FBaEIsQ0FBb0IsYUFBcEIsRUFBbUM7QUFDakMsZUFBUztBQUNQLGtCQUFhLElBQWI7QUFDQSxlQUFhLGFBQWI7QUFDQSxlQUFhLFFBQWI7QUFDQSxxQkFBYSxJQUFiO09BSkY7S0FERixFQUZtQzs7QUFXbkMsU0FBSyxHQUFMLEdBQVcsa0JBQVEsT0FBUixDQUFnQixHQUFoQixDQUFvQixhQUFwQixDQUFYLENBWG1DO0dBQXJDOztlQUZxQjs7eUJBZ0JoQixVQUFVO0FBQ2IsVUFBSSxPQUFPLEtBQUssSUFBTCxHQUFZLG1CQUFLLFFBQUwsQ0FBWixDQURFO0FBRWIsVUFBSTtBQUNGLGFBQUssR0FBTCxDQUFTLEtBQVQsY0FBMEIsSUFBMUIsRUFERTtBQUVGLHFCQUFHLFVBQUgsQ0FBYyxJQUFkLEVBQW9CLGFBQUcsSUFBSCxDQUFwQixDQUZFO0FBR0YsZUFBTyxhQUFHLFlBQUgsQ0FBZ0IsSUFBaEIsRUFBc0IsTUFBdEIsQ0FBUCxDQUhFO09BQUosQ0FJRSxPQUFPLEtBQVAsRUFBYztBQUNkLGVBRGM7T0FBZDs7OzswQkFLRSxVQUFVLFNBQTBCO1VBQWpCLGdFQUFVLHFCQUFPOztBQUN4QyxVQUFJLE9BQU8sS0FBSyxJQUFMLEdBQVksbUJBQUssUUFBTCxDQUFaLENBRDZCO0FBRXhDLFdBQUssR0FBTCxDQUFTLEtBQVQsY0FBMEIsSUFBMUIsRUFGd0M7QUFHeEMsVUFBSSxRQUFRLFVBQVUsSUFBVixHQUFpQixJQUFqQixDQUg0QjtBQUl4QyxVQUFJO0FBQ0YscUJBQUcsYUFBSCxDQUFpQixJQUFqQixFQUF1QixPQUF2QixFQUFnQyxPQUFoQyxFQUF5QyxFQUFDLFNBQVMsS0FBVCxFQUExQyxFQURFO0FBRUYsZUFBTyxJQUFQLENBRkU7T0FBSixDQUdFLE9BQU8sS0FBUCxFQUFjO0FBQ2QsYUFBSyxHQUFMLENBQVMsS0FBVCxzQ0FBa0QsSUFBbEQsRUFEYztBQUVkLGFBQUssR0FBTCxDQUFTLEtBQVQsQ0FBZSxLQUFmLEVBRmM7QUFHZCxjQUFNLEtBQU4sQ0FIYztPQUFkOzs7OzJCQU9HLFVBQVU7QUFDZixVQUFJLE9BQU8sS0FBSyxJQUFMLEdBQVksbUJBQUssUUFBTCxDQUFaLENBREk7QUFFZixXQUFLLEdBQUwsQ0FBUyxLQUFULGVBQTJCLElBQTNCLEVBRmU7QUFHZixVQUFJO0FBQ0YscUJBQUcsVUFBSCxDQUFjLElBQWQsRUFERTtBQUVGLGVBQU8sSUFBUCxDQUZFO09BQUosQ0FHRSxPQUFPLEtBQVAsRUFBYztBQUNkLGVBQU8sS0FBUCxDQURjO09BQWQ7Ozs7U0EvQ2lCO0dBQXZCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzICAgICAgZnJvbSAnZnMnO1xuaW1wb3J0IHdpbnN0b24gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQgc2hhMSAgICBmcm9tICdzaGExJztcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBNaWNyb0NhY2hlIHtcblxuICBjb25zdHJ1Y3RvcihwYXRoLCBsb2dMZXZlbCA9ICdpbmZvJykge1xuICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgd2luc3Rvbi5sb2dnZXJzLmFkZCgnbWljcm8tY2FjaGUnLCB7XG4gICAgICBjb25zb2xlOiB7XG4gICAgICAgIGNvbG9yaXplOiAgICB0cnVlLFxuICAgICAgICBsYWJlbDogICAgICAgJ21pY3JvLWNhY2hlJyxcbiAgICAgICAgbGV2ZWw6ICAgICAgIGxvZ0xldmVsLFxuICAgICAgICBwcmV0dHlQcmludDogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5sb2cgPSB3aW5zdG9uLmxvZ2dlcnMuZ2V0KCdtaWNyby1jYWNoZScpO1xuICB9XG5cbiAgcmVhZChmaWxlbmFtZSkge1xuICAgIGxldCBmaWxlID0gdGhpcy5wYXRoICsgc2hhMShmaWxlbmFtZSk7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubG9nLmRlYnVnKGByZWFkaW5nICR7ZmlsZX1gKTtcbiAgICAgIGZzLmFjY2Vzc1N5bmMoZmlsZSwgZnMuRl9PSyk7XG4gICAgICByZXR1cm4gZnMucmVhZEZpbGVTeW5jKGZpbGUsICd1dGY4Jyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICB3cml0ZShmaWxlbmFtZSwgY29udGVudCwgcmVwbGFjZSA9IGZhbHNlKSB7XG4gICAgbGV0IGZpbGUgPSB0aGlzLnBhdGggKyBzaGExKGZpbGVuYW1lKTtcbiAgICB0aGlzLmxvZy5kZWJ1Zyhgd3JpdGluZyAke2ZpbGV9YCk7XG4gICAgbGV0IGZsYWdzID0gcmVwbGFjZSA/ICd3KycgOiAnd3gnO1xuICAgIHRyeSB7XG4gICAgICBmcy53cml0ZUZpbGVTeW5jKGZpbGUsIGNvbnRlbnQsICdVVEYtOCcsIHsnZmxhZ3MnOiBmbGFnc30pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMubG9nLmRlYnVnKGB1bmFibGUgdG8gc2F2ZSB0byB0aGUgY2FjaGUgZm9yICR7ZmlsZX1gKTtcbiAgICAgIHRoaXMubG9nLmRlYnVnKGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZShmaWxlbmFtZSkge1xuICAgIGxldCBmaWxlID0gdGhpcy5wYXRoICsgc2hhMShmaWxlbmFtZSk7XG4gICAgdGhpcy5sb2cuZGVidWcoYGRlbGV0aW5nICR7ZmlsZX1gKTtcbiAgICB0cnkge1xuICAgICAgZnMudW5saW5rU3luYyhmaWxlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59O1xuIl19