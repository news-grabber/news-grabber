"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instances = new Map();

var Tracker = function () {
	function Tracker(url, body) {
		_classCallCheck(this, Tracker);

		this.body = body;
		this.url = url;
	}

	_createClass(Tracker, [{
		key: "update",
		value: function update(body) {
			if (body !== this.body) {
				this.body = body;
				return body;
			}
			return false;
		}
	}], [{
		key: "diff",
		value: function diff(url, body) {
			if (!instances.has(url)) {
				var _tracker = new Tracker(url, body);
				instances.set(url, _tracker);
				return false;
			}
			var tracker = instances.get(url);
			return tracker.update(body);
		}
	}, {
		key: "clear",
		value: function clear() {
			instances.clear();
		}
	}]);

	return Tracker;
}();

exports.default = Tracker;