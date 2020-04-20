// wiki.js - Wiki route module.

var express = require('express');
var router = express.Router();

// Home page route.
router.get('/', function (req, res) {
  res.send('Wiki home page');
})

// About page route.
router.get('/about', function (req, res) {
  res.send('About this wiki');
})

router.get('/about2', function (req, res) {
  res.render('Wiki_example', {title: 'Example Pug page'});
})

module.exports = router;