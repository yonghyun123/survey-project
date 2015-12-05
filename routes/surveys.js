var express = require('express'),
    Survey = require('../models/Survey');
var router = express.Router();

router.get('/surveys/new', function(req, res, next) {
  res.render('surveys/index', { title: 'Express' });
});

router.get('/surveys/new', function(req, res, next) {
  Survey.find({}, function(err, docs) {
    if (err) {
      return next(err);
    }
    res.render('surveys/index', {surveys: docs});
  });
});

router.get('/new', function(req, res, next) {
  res.render('surveys/new');
});
