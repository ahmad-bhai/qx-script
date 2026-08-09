// api/file.js
const express = require('express');
const app = express();

// Har kisam ki request (GET, POST, etc.) aur har URL path ke liye
app.use((req, res) => {
  // HTTP status code 404 set karein aur plain text response dein
  res.status(404).setHeader('Content-Type', 'text/plain').send('Not Found!');
});

module.exports = app;
