var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import Routes
var breedsRouter = require('./routes/breeds');
var ownerPetRouter = require('./routes/ownerPet');
var ownersRouter = require('./routes/owners');
var petsRouter = require('./routes/pets');
var petshopsRouter = require('./routes/petshops');
var petshopsServicesRouter = require('./routes/petshopsServices');
var petsServicesRouter = require('./routes/petsServices')
var productsRouter = require('./routes/products');
var servicesRouter = require('./routes/services');
var typesRouter = require('./routes/types');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routers
app.use('/', breedsRouter);
app.use('/', ownerPetRouter);
app.use('/', ownersRouter);
app.use('/', petsRouter);
app.use('/', petshopsRouter);
app.use('/', petshopsServicesRouter);
app.use('/', petsServicesRouter);
app.use('/', productsRouter);
app.use('/', servicesRouter);
app.use('/', typesRouter);


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
