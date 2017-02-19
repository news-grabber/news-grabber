import Tracker from '../src/tracker.js';
import chai from 'chai';
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);

var expect = chai.expect;

describe('tracker', function() {
    var tracker;
    before(function() {
        tracker = new Tracker();
		Tracker.clear();
    });
    it('should return false when empty', function() {
        return expect(Tracker.diff('foo', 'bar')).to.equal(false);
    });
    it('should return false when no diff', function() {
		Tracker.diff('foo', 'bar');
        return expect(Tracker.diff('foo', 'bar')).to.equal(false);
    });
    it('should return value when diff', function() {
		Tracker.diff('foo', 'bar');
        return expect(Tracker.diff('foo', 'foo')).to.equal('foo');
    });
    it('should make different instances', function() {
		Tracker.diff('foo', 'foo');
        return expect(Tracker.diff('bar', 'bar')).to.equal(false);
    });
    it('should update state on diff', function() {
		Tracker.diff('foo', 'bar');
		Tracker.diff('foo', 'foo');
        return expect(Tracker.diff('foo', 'foo')).to.equal(false);
    });
});
