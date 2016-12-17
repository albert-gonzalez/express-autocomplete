function initRouting(app) {

    app.get('/api/games/load', function (req, res) {
        const games = require('../../data/games.json');
        const gamesService = require('../service/games/games');
        const count = gamesService.loadGamesFromJson(games);

        res.send({'message': `${count} games indexed`});
    });

    app.get('/api/games/autocomplete', function (req, res) {
        const gamesService = require('../service/games/games');
        console.log(gamesService);
        gamesService.autocompleteGames(req.query.q).then(games => res.send({'data': games}));
    });

}

exports.initRouting = initRouting;