const user_helpers = require('../helpers/user_helpers');



const e = require('express');
var express = require('express');
var router = express.Router();
const session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect  ('/assessment-test');
});


router.get('/assessment-test', function(req, res) {
  res.render('assesment-test');
});


router.post('/quiz', function(req, res, next) { 
    // req.body.class = req.session.user.name
    res.redirect('/')

    const obj = JSON.parse(JSON.stringify(req.body)); 
    console.log(obj)
    console.log(req.body)
    
  });
  
module.exports = router;
