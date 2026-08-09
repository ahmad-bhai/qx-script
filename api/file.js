// api/file.js
const express = require('express');
const app = express();

app.use((req, res) => {
  res.status(404).setHeader('Content-Type', 'text/plain').send('Not Found!');
});

module.exports = app;
