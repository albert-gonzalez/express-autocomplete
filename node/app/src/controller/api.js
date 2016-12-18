const GamesService = require('../service/games/games');
const elasticsearch = require('elasticsearch');
const esClient = new elasticsearch.Client({
    host: 'elasticsearch:9200'
});

function initRouting(app) {

    app.get('/api/games/load', function (req, res) {
        const games = require('../../data/games.json');
        const gamesService = new GamesService(esClient);
        const count = gamesService.loadGamesFromJson(games);

        res.send({'message': `${count} games indexed`});
    });

    app.get('/api/games/autocomplete', function (req, res) {
        const gamesService = new GamesService(esClient);

        gamesService.autocomplete(req.query.q).then(games => res.send({'data': games}));
    });

}

exports.initRouting = initRouting;