var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var connection = require('./db/mysql');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:9527");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/', index);
app.use('/users', users);
app.options('/login', function(req,res,next){
  res.statusCode = 204;
  res.send('options request is ok');
});


var userInfoInvalidMsg ={
  success:false,
  message:'用户名与密码不匹配！'
};
var  isUserInfoValid =function(userInfo,res){
  var queryStr = "SELECT name FROM user WHERE name='"+userInfo.username+"' AND password='"+userInfo.password+"';";
   connection.query(queryStr,function(err,result,fields){
    if(result.length) {
      res.send({
          token:userInfo.username,
          success:true,
          message:'登录成功'
    })}else{
      res.send(userInfoInvalidMsg);
    }
  });
};

app.post('/login', function(req,res,next){
  console.log(req.body,req.host, req.header,req.cookies);
  var userInfo=req.body;
  try{
    isUserInfoValid(userInfo,res);
  } catch(err){
    res.send(userInfoInvalidMsg);
  }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen(3000, function () {
  console.log('Server is listening on port: 3000');
});

module.exports = app;
