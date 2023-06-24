var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var adminRouter = require('./routes/admin');

var app = express();

// Cấu hình mongoose
var mongoose = require('mongoose');
var db = "mongodb+srv://mikakimochi2k3:22112010@demo1.i1fczyl.mongodb.net/ToyStory";
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Failed to connect to the database!", err);
  });

// Khai báo và cấu hình body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', adminRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/list',adminRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;

