const WebSocket = require('ws');
const port = 9001;

const wss = new WebSocket.Server({ port: port });

const fs = require('fs');
const path = require('path');
wss.on('connection', function connection(ws) {
	ws.on('message', function incoming(message) {
		const parsed = JSON.parse(message);
		fs.writeFileSync(path.join(require.main.filename, '../../', './page/page.view.tree'), parsed.tree, 'utf-8')
		fs.writeFileSync(path.join(require.main.filename, '../../', './page/page.view.ts'), parsed.ts, 'utf-8')
		fs.writeFileSync(path.join(require.main.filename, '../../', './page/page.view.css'), parsed.css, 'utf-8')
		ws.send(message);
	});

});

