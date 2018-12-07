var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyparser = require('body-parser');
const expressValidator = require('express-validator');
const helmet = require('helmet')

/*var indexRouter = require('./routes/index');
 var usersRouter = require('./routes/users');*/

const app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(logger('dev'))
//app.use(express.json());
        .use(bodyparser.json())
        .use(bodyparser.urlencoded({extended: false}))
        .use(cookieParser())
        .use(helmet())  //server security
        .use(expressValidator()); //validate users inputs

/*app.use('/', indexRouter);
 app.use('/users', usersRouter);*/
require('./routes/')(app);
app.get('*', (req, res) => res.status(200).send({
        message: "Welcome on the Data storage API"
    }));

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
    res.status(err.status || 500).send(err);
    //res.render('error');
});

module.exports = app;
