var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var wikiRouter = require('./routes/wiki');
//Import routes for "catalog" area of site
var catalogRouter = require('./routes/catalog');
var compression = require('compression');
var helmet = require('helmet');

var app = express();

// The command above adds a subset of the available headers. 
app.use(helmet());
// Add the compression library to the middleware chain with the use() method
app.use(compression()); //Compress all routes

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/wiki', wikiRouter);
// Add catalog routes to middleware chain.
// Добавьте маршрут каталога в стек промежуточного слоя
app.use('/catalog', catalogRouter);

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

//Устанавливаем соединение с mongoose
var mongoose = require('mongoose');
// var mongoDB = 'mongodb+srv://dkmdb:nv04414243@cluster0-kfxz5.mongodb.net/local_library?retryWrites=true&w=majority';//замените url!!!

// Установить соединение с mongoose 
// var dev_db_url = 'mongodb+srv://dkmdb:nv04414243@cluster0-kfxz5.mongodb.net/local_library?retryWrites=true&w=majority';
// var mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;

