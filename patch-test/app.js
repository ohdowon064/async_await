const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dbConfig = require('./config/db');
const cors = require('cors');
// mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.connectInfo, {
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex : true, useFindAndModify:false
}).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const lolRouter = require('./routes/lol');
const mapleRouter = require('./routes/maple');
const kartRouter = require('./routes/kart');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/lol', lolRouter);
app.use('/maple', mapleRouter);
app.use('/kart', kartRouter);

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

module.exports = app;