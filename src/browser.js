import request from 'request';
import Promise from 'bluebird';
import config from './config.js';
import Debug from 'debug';
import phantom from 'phantom';
import {JSDOM} from 'jsdom';

var debug = Debug('news-grabber:browser');

class Browser {
    retrieve(entry) {
        return Promise.fromCallback(cb => request(entry.url, cb))
            .then(res => {
                var {document} = new JSDOM(res.body).window;
                var els = document.querySelectorAll(entry.selector);
                var text = Array.prototype
                    .map.call(els, el => el.textContent)
                    .join('\n');
                return text;
            });
    }
}

export default Browser;
