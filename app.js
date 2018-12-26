var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyparser = require('body-parser');
const expressValidator = require('express-validator');
const helmet = require('helmet');


const app = express();

app.use(logger('combined'))
//app.use(express.json());
        .use(bodyparser.json())
        .use(bodyparser.urlencoded({extended: false}))
        .use(cookieParser())
        .use(helmet())  //server security
        .use(expressValidator()); //validate users inputs


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

    res.status(err.status || 500).send(err);
});

module.exports = app;
