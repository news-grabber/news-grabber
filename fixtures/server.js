import http from 'http';
import process from 'process';

var port = process.env.SERVER_PORT || 3009;
var alternate = 'first';
var socket = null;

function mkServer(done) {
    var server = http.createServer(function(req, res) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        if (req.url === '/same') {
            res.end('the same');
        } else if (req.url === '/alternate') {
            res.end(alternate);
            alternate = alternate === 'first' ? 'second' : 'first';
        } else if (req.url === '/complex') {
            let str = [
                '<html>',
                '<body>',
                '  <li class="bar"><a>alice</a></li>',
                '  <li class="foo"><a>harttle</a></li>',
                '</body>',
                '</html>'
            ].join('\n');
            res.end(str);
        } else {
            res.writeHead(404);
            res.end('Not Found');
        }
    });
    socket = server.listen(port, () => done());
}

function closeServer(done) {
    socket.close(() => done());
}

export default { mkServer, closeServer };
