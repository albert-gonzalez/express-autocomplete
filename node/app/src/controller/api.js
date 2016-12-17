const GamesService = require('../service/games/games');
const elasticsearch = require('elasticsearch');

function initRouting(app) {

    app.get('/api/games/load', function (req, res) {
        const games = require('../../data/games.json');
        const gamesService = new GamesService(new elasticsearch.Client({
            host: 'elasticsearch:9200'
        }));
        const count = gamesService.loadGamesFromJson(games);

        res.send({'message': `${count} games indexed`});
    });

    app.get('/api/games/autocomplete', function (req, res) {
        const gamesService = new GamesService(new elasticsearch.Client({
            host: 'elasticsearch:9200'
        }));

        gamesService.autocomplete(req.query.q).then(games => res.send({'data': games}));
    });

}

exports.initRouting = initRouting;