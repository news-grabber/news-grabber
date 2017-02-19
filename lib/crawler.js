'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _config = require('../config.json');

var _config2 = _interopRequireDefault(_config);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('news-grabber:crawler');

var crawler = {
    crawl: function crawl(url) {
        debug('crawling ' + url);
        var options = {
            method: 'GET',
            gzip: true,
            url: url,
            encoding: null,
            headers: {
                'User-Agent': _config2.default.userAgent
            },
            timeout: _config2.default.timeout
        };
        return _bluebird2.default.fromCallback(function (cb) {
            return (0, _request2.default)(options, cb);
        }, { multiArgs: true }).spread(function (res, body) {
            debug('[' + res.statusCode + '] ' + url);
            return body;
        });
    }
};

module.exports = crawler;