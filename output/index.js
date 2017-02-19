'use strict';

var _cron = require('cron');

var _cron2 = _interopRequireDefault(_cron);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _crawler = require('./crawler.js');

var _crawler2 = _interopRequireDefault(_crawler);

var _tracker = require('./tracker.js');

var _tracker2 = _interopRequireDefault(_tracker);

var _mail = require('./mail.js');

var _mail2 = _interopRequireDefault(_mail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var job = new _cron2.default.CronJob({
    cronTime: _config2.default.timing,
    onTick: function onTick() {
        return _config2.default.pages.forEach(function (page) {
            return checkUpdate(page);
        });
    },
    timeZone: _config2.default.timezone
});

function checkUpdate(page) {
    console.log('checking updates for ' + page.title + '(' + page.url + ')');
    _crawler2.default.crawl(page.url).then(function (body) {
        return _tracker2.default.diff(page.url, body);
    }).then(function (diff) {
        if (diff) {
            var msg = 'update found, sending mails to ' + _config2.default.mail.receivers;
            console.log(msg);
            _mail2.default.sendUpdate(page, diff);
        } else {
            console.log('no update found');
        }
    }).catch(function (e) {
        console.error('error occurred', e);
    });
}

job.start();

console.log('job started, watching for ' + _config2.default.pages.length + ' pages');