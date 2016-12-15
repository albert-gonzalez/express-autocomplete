'use strict';

const express = require('express');
const apiController = require('./controller/api');
const PORT = 8888;
const app = express();

apiController.initRouting(app);

app.use(function (err, req, res) {
    console.error(err.stack);
    res.status(500).send({'error': err.message});
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);