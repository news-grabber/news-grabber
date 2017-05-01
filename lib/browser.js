'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _phantom = require('phantom');

var _phantom2 = _interopRequireDefault(_phantom);

var _jsdom = require('jsdom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = (0, _debug2.default)('news-grabber:browser');

var Browser = function () {
    function Browser() {
        _classCallCheck(this, Browser);
    }

    _createClass(Browser, [{
        key: 'retrieve',
        value: function retrieve(entry) {
            return _bluebird2.default.fromCallback(function (cb) {
                return (0, _request2.default)(entry.url, cb);
            }).then(function (res) {
                var document = new _jsdom.JSDOM(res.body).window.document;

                var els = document.querySelectorAll(entry.selector);
                var text = Array.prototype.map.call(els, function (el) {
                    return el.textContent;
                }).join('\n');
                return text;
            });
        }
    }]);

    return Browser;
}();

exports.default = Browser;