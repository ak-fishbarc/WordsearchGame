const express = require('express');
const path = require('path');

const app = express();
const port = 8000;

app.use(express.static('templates'));
app.use(express.static('public'));

app.get('/front_page', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/front_page.html'));
});
app.get('/public/scripts/wordsearch_bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/scripts/wordsearch_bundle.js'))
});
app.get('/public/scripts/wordsearch_generators.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/scripts/wordsearch_generators.js'))
});
app.get('/public/scripts/wordsearch_create_dom.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/scripts/wordsearch_create_dom.js'))
});



app.listen(port);

module.exports = app;
