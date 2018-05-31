const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');


const path = require('path');
const proxy = require('./api/config/fetch');

global._rootname = path.join(__dirname);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/* app.use(session({
    secret: 'token', // 与cookieParser中的一致
    resave: true,
    saveUninitialized: true
})) */
app.use('/transfer', proxy);



var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("host",host,port);
    console.log('Example app listening at http://%s:%s', host, port);
});