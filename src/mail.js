import nodemailer from 'nodemailer';
import config from '../config.json';
import _ from 'lodash';
import Promise from 'bluebird';
import Debug from 'debug';

let debug = Debug('news-grabber:mail');

debug('initializing nodemailer with options', config.nodemailer);
let transporter = nodemailer.createTransport(config.nodemailer);

// setup email data with unicode symbols
let mailOptions = {
	from: config.nodemailer.from
};

// send mail with defined transport object
function sendUpdate(page, body) {
	var text = [
		`Update found for ${page.title}:`,
		body,
		`Visit ${page.url} for details.`
	].join('\n\n');
	var options = _.assign({}, mailOptions, {
		subject: `Update for ${page.title}`,
		text: text,
		to: page.mail.receivers.join(',')
	});
	debug('sending mail with options', options);
	return Promise.fromCallback(cb => transporter.sendMail(options, cb))
		.then(info => {
			console.log('Message %s sent: %s', info.messageId, info.response);
		})
		.catch(error => {
			return console.log(error);
		});
}

export default { sendUpdate };
