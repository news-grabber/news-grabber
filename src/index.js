import cron from 'cron';
import config from '../config.json';
import Browser from './browser.js';
import tracker from './tracker.js';
import mail from './mail.js';

var job = new cron.CronJob({
    cronTime: config.timing,
    onTick: () => config.pages.forEach(page => checkUpdate(page)),
    timeZone: config.timezone
});

function checkUpdate(page) {
    console.log(`checking updates for ${page.title}(${page.url})`);
    var browser = new Browser();
    browser.retrieve(page)
        .then(body => tracker.diff(page.url, body))
        .then(diff => {
            if (diff === false) {
                return console.log('no update found');
            }
            mail.sendUpdate(page, diff);
        })
        .catch(err => {
            console.error('error occurred', err);
        });
}

job.start();

console.log(`job started, watching for ${config.pages.length} pages`);
