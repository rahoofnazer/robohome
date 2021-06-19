const { response } = require('express');
var express = require('express');
var router = express.Router();
var user_helpers = require('../helpers/user_helpers')
var session = require('express-session');
const { rawListeners } = require('../app');
const {homeview, generatePdf}  = require('../controllers/homeController');



router.post('/assessment-test', function (req, res) {
  const grade = req.body.class

  user_helpers.CreateUser(req.body).then((response) => {
    
    req.session.user = response
    console.log(req.session.user)

    if (grade === '1to4') {
      console.log("1 to 4")
      res.redirect('/assessment_test.x')
    } else if (grade === '5to8') {
      res.redirect('/assessment_test.y')
    } else if (grade === '8plus') {
      res.redirect('/assessment_test.z')
    }

  })

});



router.get('/assessment_test.x', function (req, res) {
  if (req.session.user) {
    res.render('user/test-1to4');
  }else {
    res.redirect('/assessment-test')
  }

});

router.get('/assessment_test.y', function (req, res) {
  res.render('user/test-5to8');
});

router.get('/assessment_test.z', function (req, res) {
  res.render('user/test-8plus');
});


//////////////////////////////////xxxxxxxxxxxxxxxxxx////////////////////////////////////////////

router.post('/qstx', function (req, res) {

  user = req.session.user
  console.log(req.body)
  

  let now_local = new Date();
let now_utc = new Date();

now_utc.setMinutes(now_utc.getMinutes() + now_utc.getTimezoneOffset())

// Specify the format you want
let date_format = {};
date_format.year = 'numeric';
date_format.month = 'numeric';
date_format.day = '2-digit';

let datetime_format = {};
date_format.year = 'numeric';
date_format.month = 'numeric';
date_format.day = '2-digit';
date_format.hour = 'numeric';
date_format.minute = 'numeric';
date_format.second = 'numeric';

  user.mark = '0'
  user.date = now_local.toLocaleDateString('us-EN', datetime_format);
  user.datetime = now_local.toLocaleDateString('us-EN', date_format);
  

  user.q1 = req.body.q1
  user.q2 = req.body.q2
  user.q3 = req.body.q3
  user.q4 = req.body.q4
  user.q5 = req.body.q5
  user.q6 = req.body.q6
  user.q7 = req.body.q7
  user.q8 = req.body.q8
  user.q9 = req.body.q9
  user.q10 = req.body.q10



  var q1 = parseInt(user.q1)
  var q2 = parseInt(user.q2)
  var q3 = parseInt(user.q3)
  var q4 = parseInt(user.q4)
  var q5 = parseInt(user.q5)
  var q6 = parseInt(user.q6)
  var q7 = parseInt(user.q7)
  var q8 = parseInt(user.q8)
  var q9 = parseInt(user.q9)
  var q10 = parseInt(user.q10)

  
 if (q1===10){
   console.log("if worrkeed")
   user.mark = Number(user.mark)+Number(q1)
 }
 if (q2===10){
  user.mark = Number(user.mark)+Number(q2)
 }
 if (q3===10){
  user.mark = Number(user.mark)+Number(q3)
 }
 if (q4===10){
  user.mark = Number(user.mark)+Number(q4)
 }
 if (q5===10){
  user.mark = Number(user.mark)+Number(q5)
 }
 if (q6===10){
  user.mark = Number(user.mark)+Number(q6)
 }
 if (q7===10){
  user.mark = Number(user.mark)+Number(q7)
 }
 if (q8===10){
  user.mark = Number(user.mark)+Number(q8)
 }
 if (q9===10){
  user.mark = Number(user.mark)+Number(q9)
 }
 if (q10===10){
  user.mark = Number(user.mark)+Number(q10)
 }
 

  if(user.mark>=80){
        user.scholar = 'A'
  }else{
        user.scholar= 'B'
  }

  if (user.class === '1to4') {
    user.level = 'X'
  } else if (user.class === '5to8') {
    user.level = 'Y'
  } else if (user.class === '8plus') {
    user.level = 'Z'
  }

  console.log(user)

  user_helpers.getUserCount().then((userCount)=>{
    console.log("usercount:........",userCount)
    user = req.session.user
    user.index = userCount
    user.uniqueid = 'RH'+user.index+user.level+user.scholar
    console.log('unique id::::::'+ user.uniqueid)
    console.log('response printng//////////////////////////////////////...................')
    console.log(req.session.user)
    
    user_helpers.UpdateUser(user).then((response)=>{
      console.log(user)
    })
  })


   

  res.send({ redirect: '/certificate' })

});



///////////////////////////////////yyyyyyyyyyyyyyyyyyyyyy//////////////////////////////////////


router.post('/qsty', function (req, res) {

  user = req.session.user
  console.log(req.body)
  

  let now_local = new Date();
let now_utc = new Date();

now_utc.setMinutes(now_utc.getMinutes() + now_utc.getTimezoneOffset())

// Specify the format you want
let date_format = {};
date_format.year = 'numeric';
date_format.month = 'numeric';
date_format.day = '2-digit';

let datetime_format = {};
date_format.year = 'numeric';
date_format.month = 'numeric';
date_format.day = '2-digit';
date_format.hour = 'numeric';
date_format.minute = 'numeric';
date_format.second = 'numeric';

  user.mark = '0'
  user.date = now_local.toLocaleDateString('us-EN', datetime_format);
  user.datetime = now_local.toLocaleDateString('us-EN', date_format);
  

  user.q1 = req.body.q1
  user.q2 = req.body.q2
  user.q3 = req.body.q3
  user.q4 = req.body.q4
  user.q5 = req.body.q5
  user.q6 = req.body.q6
  user.q7 = req.body.q7
  user.q8 = req.body.q8
  user.q9 = req.body.q9
  user.q10 = req.body.q10



  var q1 = parseInt(user.q1)
  var q2 = parseInt(user.q2)
  var q3 = parseInt(user.q3)
  var q4 = parseInt(user.q4)
  var q5 = parseInt(user.q5)
  var q6 = parseInt(user.q6)
  var q7 = parseInt(user.q7)
  var q8 = parseInt(user.q8)
  var q9 = parseInt(user.q9)
  var q10 = parseInt(user.q10)

  
 if (q1===10){
   console.log("if worrkeed")
   user.mark = Number(user.mark)+Number(q1)
 }
 if (q2===10){
  user.mark = Number(user.mark)+Number(q2)
 }
 if (q3===10){
  user.mark = Number(user.mark)+Number(q3)
 }
 if (q4===10){
  user.mark = Number(user.mark)+Number(q4)
 }
 if (q5===10){
  user.mark = Number(user.mark)+Number(q5)
 }
 if (q6===10){
  user.mark = Number(user.mark)+Number(q6)
 }
 if (q7===10){
  user.mark = Number(user.mark)+Number(q7)
 }
 if (q8===10){
  user.mark = Number(user.mark)+Number(q8)
 }
 if (q9===10){
  user.mark = Number(user.mark)+Number(q9)
 }
 if (q10===10){
  user.mark = Number(user.mark)+Number(q10)
 }
 

  if(user.mark>=80){
        user.scholar = 'A'
  }else{
        user.scholar= 'B'
  }

  if (user.class === '1to4') {
    user.level = 'X'
  } else if (user.class === '5to8') {
    user.level = 'Y'
  } else if (user.class === '8plus') {
    user.level = 'Z'
  }

  console.log(user)

  user_helpers.getUserCount().then((userCount)=>{
    console.log("usercount:........",userCount)
    user = req.session.user
    user.index = userCount
    user.uniqueid = 'RH'+user.index+user.level+user.scholar
    console.log('unique id::::::'+ user.uniqueid)
    console.log('response printng//////////////////////////////////////...................')
    console.log(req.session.user)

    user_helpers.UpdateUser(user).then((response)=>{
      console.log(user)
    })
  })


  res.send({ redirect: '/certificate' })

});





router.get('/certificate',generatePdf,(req, res, next) => {
 
  setTimeout(() => next(), 2000);
  // res.render('user/certificate')
});


module.exports = router;
