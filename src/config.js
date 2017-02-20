import process from 'process';
import path from 'path';
import fs from 'fs';

var configPath = (process.env.NODE_ENV === 'development') ?
    'news-grabberc.dev.json' :
    'news-grabberc.json';

configPath = path.resolve(process.cwd(), configPath);

try {
    var config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (e) {
    console.error(`you need a news-grabberc.json file in the cwd`);
}

export default config;
