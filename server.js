const express = require('express');
const next = require('next');
const path = require('path');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/static/iphone/:file', (req, res) => {
    console.log('static file requested');

    const {file} = req.params;
    console.log(file);
    const filePath = path.join(__dirname, 'public', 'static', 'iphone', file);

    // Set cache control headers
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year

    // Serve the file
    fs.createReadStream(filePath).pipe(res);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
