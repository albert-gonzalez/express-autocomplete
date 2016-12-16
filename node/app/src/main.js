'use strict';

const express = require('express');
const nunjucks = require('nunjucks');
const apiController = require('./controller/api');
const webController = require('./controller/web');
const PORT = 8888;
const app = express();

app.set('views', __dirname + '/view');
app.set('view engine', 'nunjucks');

nunjucks.configure(app.get('views'), {
    autoescape: true,
    noCache: true,
    watch: true,
    express: app
});

apiController.initRouting(app);
webController.initRouting(app);

app.use(express.static(__dirname + '/../dist'));

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({'error': err.message});
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);