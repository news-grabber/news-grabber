'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _config = require('../config.json');

var _config2 = _interopRequireDefault(_config);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _phantom = require('phantom');

var _phantom2 = _interopRequireDefault(_phantom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = (0, _debug2.default)('news-grabber:browser');

var Browser = function () {
    function Browser() {
        _classCallCheck(this, Browser);
    }

    _createClass(Browser, [{
        key: 'openPage',
        value: function openPage(url) {
            var _this = this;

            debug('opening ', url);
            return _phantom2.default.create(['--ignore-ssl-errors=yes', '--load-images=no']).then(function (instance) {
                debug('instance created');
                _this.ph = instance;
                return instance.createPage();
            }).then(function (page) {
                debug('page created, opening url...');
                _this.page = page;
                return page.open(url);
            }).then(function (status) {
                debug('page opened, status ', status);
                if (status !== 'success') {
                    throw new Error('network error');
                }
            });
        }
    }, {
        key: 'retrieve',
        value: function retrieve(entry) {
            var _this2 = this;

            var js = ['function() {', '  var el = document.querySelector(\'' + entry.selector + '\');', '  return el.innerText;', '}'].join('\n');
            return this.openPage(entry.url).then(function () {
                debug('running script to retrieve selector text');
                return _this2.page.evaluateJavaScript(js);
            }).then(function (result) {
                debug('selector text retrieved', result);
                _this2.ph.exit();
                return result;
            }).catch(function (err) {
                _this2.ph.exit();
                throw err;
            });
        }
    }]);

    return Browser;
}();

exports.default = Browser;