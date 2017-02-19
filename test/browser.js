import Browser from '../src/browser.js';
import chai from 'chai';
import chaiAsPromised from "chai-as-promised";
import Server from '../fixtures/server.js';

chai.use(chaiAsPromised);

var expect = chai.expect;
var port = process.env.SERVER_PORT || 3009;

describe('browser', function() {
    var browser;
    this.timeout(10000);
    before(function(done) {
        browser = new Browser();
        Server.mkServer(done);
    });
    after(function(done) {
        Server.closeServer(done);
    });
    it('should accept when 404', function() {
        return expect(browser
            .retrieve({
                url: 'http://localhost:' + port,
                selector: 'html'
            })).to.eventually.equal('Not Found');
    });
    it('should throw when connect error', function() {
        return expect(browser
            .retrieve({
                url: 'http://localhost:9999',
                selector: 'html'
            })).to.eventually.be.rejectedWith('network error');
    });
    it('should resolve with html selector', function() {
        return expect(browser
            .retrieve({
                url: 'http://localhost:' + port + '/same',
                selector: 'html'
            })).to.eventually.equal('the same');
    });
    it('should resolve with conbination selector', function() {
        return expect(browser
            .retrieve({
                url: 'http://localhost:' + port + '/complex',
                selector: '.foo a'
            })).to.eventually.equal('harttle');
    });
});
