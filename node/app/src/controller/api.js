function transformHitsToGames(hits) {
    return hits.map((hit) => ({
        id: hit._source.id,
        name: hit._source.name,
        site_detail_url: hit._source.site_detail_url
    }));
}

function initRouting(app) {
    app.get('/api/games/load', function (req, res) {
        const elasticsearch = require('elasticsearch');
        const client = new elasticsearch.Client({
            host: 'elasticsearch:9200'
        });

        const games = require('../../data/games.json');
        let count = 0;
        for (let game of games) {
            client.create({
                index: 'games',
                type: 'game',
                id: game.id,
                body: game
            });

            count++;
        }

        res.send({'message': `${count} games indexed`});
    });

    app.get('/api/games/autocomplete', function (req, res) {
        const elasticsearch = require('elasticsearch');
        const client = new elasticsearch.Client({
            host: 'elasticsearch:9200'
        });

        client.search({
            q: req.query.q,
            index: 'games',
            type: 'game'
        }).then((data) => res.send({'data': transformHitsToGames(data.hits.hits)}));
    });
}

exports.initRouting = initRouting;