var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productosRouter = require('./routes/productos');
var usuariosRouter = require('./routes/usuarios');
var app = express();
var cors = require('cors')
const mongo = require('./connect/mongodb');



mongo.mongodb()
.then(()=>console.log('data base connected'))
.catch((err)=>console.error(err.message), 'no connection')




app.use(cors())
app.set('security', 'securitypass')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/productos',validateApp, productosRouter);
app.use('/usuarios', usuariosRouter);





function validateApp(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    res.status(401).send('missing token');
    return;
  }
  

  jwt.verify(token, req.app.get('security'), (err, decoded) => {
    if (err) {
      console.error(err, { message: 'validacion incorrecta' });
      res.status(400).send('error');
      return;
    }

    req.body.id = decoded.id;
    next();
  });
}


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
