const express = require('express');
const next = require('next');
const path = require('path');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/static/:type/:file', (req, res) => {
    const { type, file } = req.params;
    const filePath = path.join(__dirname, 'public', type, file);

    // Set cache control headers
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year

    // Serve the file
    fs.createReadStream(filePath).pipe(res);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
