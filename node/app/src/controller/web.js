function initRouting(app) {
    app.get('/', (req, res) => {
        res.render('autocomplete');
    });
}

exports.initRouting = initRouting;
