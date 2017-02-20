import request from 'request';
import Promise from 'bluebird';
import config from './config.js';
import Debug from 'debug';
import phantom from 'phantom';

var debug = Debug('news-grabber:browser');

class Browser {
    openPage(url) {
        debug('opening ', url);
        return phantom.create(['--ignore-ssl-errors=yes', '--load-images=no'])
            .then(instance => {
                debug('instance created');
                this.ph = instance;
                return instance.createPage();
            })
            .then(page => {
                debug('page created, opening url...');
                this.page = page;
                return page.open(url);
            })
            .then(status => {
                debug('page opened, status ', status);
                if (status !== 'success') {
                    throw new Error('network error');
                }
            });
    }
    retrieve(entry) {
        var js = [
            'function() {',
            `  var els = document.querySelectorAll('${entry.selector}');`,
            '  var text = [];',
            '  for(var i=0; i<els.length; i++){',
            '    text.push(els[i].innerText);',
            '  }',
            `  return text.join('\\n');`,
            '}'
        ].join('\n');
        return this.openPage(entry.url)
            .then(() => {
                debug('running script to retrieve selector text');
                return this.page.evaluateJavaScript(js);
            })
            .then((result) => {
                debug('selector text retrieved', result);
                this.ph.exit();
                return result;
            })
            .catch((err) => {
                this.ph.exit();
                throw err;
            });
    }
}

export default Browser;
