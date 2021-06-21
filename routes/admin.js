var express = require('express');
var router = express.Router();
var admin_helper = require('../helpers/admin-helper');

const verifyAdmin=(req,res,next)=>{
  console.log("Verify admin called")
  if(req.session.admin){
    next()
  }else{
    res.redirect('/admin') 
  }
}

router.get('/', function(req, res, next) {
  res.render('admin/login');
});

router.post('/login', function(req, res, next) {


// admin_helper.doSignup(req.body).then((response)=>{
//   console.log(response)
//   res.redirect('/admin/dashboard')
//   })

  console.log(req.body)
  admin_helper.doLogin(req.body).then((response)=>{
    
    if(response.status){
      req.session.admin=true
      req.session.admin=response.admin
      res.redirect('/admin/dashboard')
    }else{
      req.session.adminLoginErr=true
      res.redirect('/admin')
    }    
  })

});


router.get('/dashboard', verifyAdmin,function(req, res) {

  admin_helper.getAllUsers().then((users)=>{
    res.render('admin/dashboard',{users});

  })
});

router.get('/logout',function(req, res) {

  req.session.destroy()
    res.redirect('/');


});

module.exports = router;
