#!/usr/bin/env node
'use strict';

var _cron = require('cron');

var _cron2 = _interopRequireDefault(_cron);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _browser = require('./browser.js');

var _browser2 = _interopRequireDefault(_browser);

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
    var browser = new _browser2.default();
    browser.retrieve(page).then(function (body) {
        return _tracker2.default.diff(page.url, body);
    }).then(function (diff) {
        if (diff === false) {
            return console.log('no update found');
        }
        _mail2.default.sendUpdate(page, diff);
    }).catch(function (err) {
        console.error('error occurred', err);
    });
}

job.start();

console.log('job started, watching for ' + _config2.default.pages.length + ' pages');