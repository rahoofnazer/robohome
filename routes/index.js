const user_helpers = require('../helpers/user_helpers');



const e = require('express');
var express = require('express');
var router = express.Router();
const session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/index', function(req, res, next) {
  res.redirect('/');
});

router.get('/assessment_test', function(req, res) {
  res.render('assesment-test');
});

router.get('/book_a_free_session', function(req, res) {
  res.render('book_a_free_session');
});

router.get('/download_brochure', function(req, res) {
  res.render('download_form');
});

router.get('/know_more', function(req, res) {
  res.render('know_more');
});

router.get('/ore_best_innovation_challenge', function(req, res) {
  res.render('ore_best_innovation_challenge');
});

router.get('/privacypolicy', function(req, res) {
  res.render('privacypolicy');
});

router.get('/termsandconditions', function(req, res) {
  res.render('termsandconditions');
});

// router.post('/quiz', function(req, res, next) { 
//     // req.body.class = req.session.user.name
//     res.redirect('/')

//     const obj = JSON.parse(JSON.stringify(req.body)); 
//     console.log(obj)
//     console.log(req.body)
    
//   });
  
module.exports = router;
