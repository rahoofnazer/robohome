var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const homeRoutes = require('./routes/home-routes');


var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin')
var app = express();
var db = require('./config/connection')
var session=require('express-session')
app.use(session({secret:"Key",resave:true, saveUninitialized:true,cookie:{maxAge:6000000000000000000000000000}}))

const cors = require('cors') // includes cors module

db.connect((err)=>{
  if(err)
  console.log("Connection Error"+err)
  else console.log("Database conneted successfully")

})


app.use('/', userRouter);
// app.use('/admin', adminRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.use('/docs', express.static(path.join(__dirname, 'docs')));
app.use(homeRoutes.routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// -------------------------------

app.use(cors()) // We're telling express to use CORS
app.use(express.json()) // we need to tell server to use json as well



module.exports = app; 
