require('./firebase.js')
var createError = require('http-errors');
var express = require('express');
const exphbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
var session = require('express-session');
const bodyparser = require('body-parser');
var path = require('path');
var https = require('https');
var fs = require('fs');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var app = express();

var loginRouter = require('./routes/index.js');
var blogRouter = require('./routes/myblog.js')

app.use(morgan('dev'));
app.use(session({ secret: 'this-is-a-secret-token', cookie: { maxAge: 60000 } }));
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('html', exphbs({
    extname: 'html',
    defaultLayout: 'index',
    // helpers: require("./config/helpers.js").helpers,
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/layouts/',
    section: express_handlebars_sections()
}));
app.set('view engine', 'html');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'CSS')));
app.use("/JS", express.static(path.join(__dirname, '/views/js')));
app.use("/CSS", express.static(path.join(__dirname, '/CSS')));
app.use("/views", express.static(path.join(__dirname, '/views')));
app.use(favicon(path.join(__dirname + '/favicon/favicon.ico')));


app.use('/', loginRouter);
app.use('/blog', blogRouter);


var options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.render('error404', { title: 'Error 404', layout: false })
});
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error500', { title: 'Error 500', layout: false });
});

/**
 * Create HTTPS server.
 */
var server = https.createServer(options, app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
// server.on('listening', onListening);

function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}


function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}