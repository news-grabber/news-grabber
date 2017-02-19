'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _config = require('../config.json');

var _config2 = _interopRequireDefault(_config);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('news-grabber:mail');

debug('initializing nodemailer with options', _config2.default.nodemailer);
var transporter = _nodemailer2.default.createTransport(_config2.default.nodemailer);

// setup email data with unicode symbols
var mailOptions = {
	from: _config2.default.nodemailer.from
};

// send mail with defined transport object
function sendUpdate(page, body) {
	var text = ['Update found for ' + page.title + ':', body, 'Visit ' + page.url + ' for details.'].join('\n\n');
	var options = _lodash2.default.assign({}, mailOptions, {
		subject: 'Update for ' + page.title,
		text: text,
		to: page.mail.receivers.join(',')
	});
	debug('sending mail with options', options);
	return _bluebird2.default.fromCallback(function (cb) {
		return transporter.sendMail(options, cb);
	}).then(function (info) {
		console.log('Message %s sent: %s', info.messageId, info.response);
	}).catch(function (error) {
		return console.log(error);
	});
}

exports.default = { sendUpdate: sendUpdate };