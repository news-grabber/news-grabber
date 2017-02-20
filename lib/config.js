'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _process = require('process');

var _process2 = _interopRequireDefault(_process);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configPath = _process2.default.env.NODE_ENV === 'development' ? 'news-grabberc.dev.json' : 'news-grabberc.json';

configPath = _path2.default.resolve(_process2.default.cwd(), configPath);

try {
    var config = JSON.parse(_fs2.default.readFileSync(configPath, 'utf8'));
} catch (e) {
    console.error('you need a news-grabberc.json file in the cwd');
    _process2.default.exit();
}

exports.default = config;