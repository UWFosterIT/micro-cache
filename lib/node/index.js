'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

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
      var file = this.path + filename;
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

      var file = this.path + filename;
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
      var file = this.path + filename;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsT0FBTyxPQUFQO0FBRUUsV0FGcUIsVUFFckIsQ0FBWSxJQUFaLEVBQXFDO1FBQW5CLGlFQUFXLHNCQUFROzswQkFGaEIsWUFFZ0I7O0FBQ25DLFNBQUssSUFBTCxHQUFZLElBQVosQ0FEbUM7QUFFbkMsc0JBQVEsT0FBUixDQUFnQixHQUFoQixDQUFvQixhQUFwQixFQUFtQztBQUNqQyxlQUFTO0FBQ1Asa0JBQWEsSUFBYjtBQUNBLGVBQWEsYUFBYjtBQUNBLGVBQWEsUUFBYjtBQUNBLHFCQUFhLElBQWI7T0FKRjtLQURGLEVBRm1DOztBQVduQyxTQUFLLEdBQUwsR0FBVyxrQkFBUSxPQUFSLENBQWdCLEdBQWhCLENBQW9CLGFBQXBCLENBQVgsQ0FYbUM7R0FBckM7O2VBRnFCOzt5QkFnQmhCLFVBQVU7QUFDYixVQUFJLE9BQU8sS0FBSyxJQUFMLEdBQVksUUFBWixDQURFO0FBRWIsVUFBSTtBQUNGLGFBQUssR0FBTCxDQUFTLEtBQVQsY0FBMEIsSUFBMUIsRUFERTtBQUVGLHFCQUFHLFVBQUgsQ0FBYyxJQUFkLEVBQW9CLGFBQUcsSUFBSCxDQUFwQixDQUZFO0FBR0YsZUFBTyxhQUFHLFlBQUgsQ0FBZ0IsSUFBaEIsRUFBc0IsTUFBdEIsQ0FBUCxDQUhFO09BQUosQ0FJRSxPQUFPLEtBQVAsRUFBYztBQUNkLGVBRGM7T0FBZDs7OzswQkFLRSxVQUFVLFNBQTBCO1VBQWpCLGdFQUFVLHFCQUFPOztBQUN4QyxVQUFJLE9BQU8sS0FBSyxJQUFMLEdBQVksUUFBWixDQUQ2QjtBQUV4QyxXQUFLLEdBQUwsQ0FBUyxLQUFULGNBQTBCLElBQTFCLEVBRndDO0FBR3hDLFVBQUksUUFBUSxVQUFVLElBQVYsR0FBaUIsSUFBakIsQ0FINEI7QUFJeEMsVUFBSTtBQUNGLHFCQUFHLGFBQUgsQ0FBaUIsSUFBakIsRUFBdUIsT0FBdkIsRUFBZ0MsT0FBaEMsRUFBeUMsRUFBQyxTQUFTLEtBQVQsRUFBMUMsRUFERTtBQUVGLGVBQU8sSUFBUCxDQUZFO09BQUosQ0FHRSxPQUFPLEtBQVAsRUFBYztBQUNkLGFBQUssR0FBTCxDQUFTLEtBQVQsc0NBQWtELElBQWxELEVBRGM7QUFFZCxhQUFLLEdBQUwsQ0FBUyxLQUFULENBQWUsS0FBZixFQUZjO0FBR2QsY0FBTSxLQUFOLENBSGM7T0FBZDs7OzsyQkFPRyxVQUFVO0FBQ2YsVUFBSSxPQUFPLEtBQUssSUFBTCxHQUFZLFFBQVosQ0FESTtBQUVmLFdBQUssR0FBTCxDQUFTLEtBQVQsZUFBMkIsSUFBM0IsRUFGZTtBQUdmLFVBQUk7QUFDRixxQkFBRyxVQUFILENBQWMsSUFBZCxFQURFO0FBRUYsZUFBTyxJQUFQLENBRkU7T0FBSixDQUdFLE9BQU8sS0FBUCxFQUFjO0FBQ2QsZUFBTyxLQUFQLENBRGM7T0FBZDs7OztTQS9DaUI7R0FBdkIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHdpbnN0b24gZnJvbSAnd2luc3Rvbic7XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgTWljcm9DYWNoZSB7XG5cbiAgY29uc3RydWN0b3IocGF0aCwgbG9nTGV2ZWwgPSAnaW5mbycpIHtcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgIHdpbnN0b24ubG9nZ2Vycy5hZGQoJ21pY3JvLWNhY2hlJywge1xuICAgICAgY29uc29sZToge1xuICAgICAgICBjb2xvcml6ZTogICAgdHJ1ZSxcbiAgICAgICAgbGFiZWw6ICAgICAgICdtaWNyby1jYWNoZScsXG4gICAgICAgIGxldmVsOiAgICAgICBsb2dMZXZlbCxcbiAgICAgICAgcHJldHR5UHJpbnQ6IHRydWVcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMubG9nID0gd2luc3Rvbi5sb2dnZXJzLmdldCgnbWljcm8tY2FjaGUnKTtcbiAgfVxuXG4gIHJlYWQoZmlsZW5hbWUpIHtcbiAgICBsZXQgZmlsZSA9IHRoaXMucGF0aCArIGZpbGVuYW1lO1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmxvZy5kZWJ1ZyhgcmVhZGluZyAke2ZpbGV9YCk7XG4gICAgICBmcy5hY2Nlc3NTeW5jKGZpbGUsIGZzLkZfT0spO1xuICAgICAgcmV0dXJuIGZzLnJlYWRGaWxlU3luYyhmaWxlLCAndXRmOCcpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgd3JpdGUoZmlsZW5hbWUsIGNvbnRlbnQsIHJlcGxhY2UgPSBmYWxzZSkge1xuICAgIGxldCBmaWxlID0gdGhpcy5wYXRoICsgZmlsZW5hbWU7XG4gICAgdGhpcy5sb2cuZGVidWcoYHdyaXRpbmcgJHtmaWxlfWApO1xuICAgIGxldCBmbGFncyA9IHJlcGxhY2UgPyAndysnIDogJ3d4JztcbiAgICB0cnkge1xuICAgICAgZnMud3JpdGVGaWxlU3luYyhmaWxlLCBjb250ZW50LCAnVVRGLTgnLCB7J2ZsYWdzJzogZmxhZ3N9KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLmxvZy5kZWJ1ZyhgdW5hYmxlIHRvIHNhdmUgdG8gdGhlIGNhY2hlIGZvciAke2ZpbGV9YCk7XG4gICAgICB0aGlzLmxvZy5kZWJ1ZyhlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICByZW1vdmUoZmlsZW5hbWUpIHtcbiAgICBsZXQgZmlsZSA9IHRoaXMucGF0aCArIGZpbGVuYW1lO1xuICAgIHRoaXMubG9nLmRlYnVnKGBkZWxldGluZyAke2ZpbGV9YCk7XG4gICAgdHJ5IHtcbiAgICAgIGZzLnVubGlua1N5bmMoZmlsZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufTtcbiJdfQ==