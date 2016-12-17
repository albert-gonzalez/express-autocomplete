function transformHitsToGames(hits) {
    return hits.map((hit) => ({
        id: hit._source.id,
        name: hit._source.name,
        site_detail_url: hit._source.site_detail_url
    }));
}

exports.loadGamesFromJson = function (games) {
    const elasticsearch = require('elasticsearch');
    const client = new elasticsearch.Client({
        host: 'elasticsearch:9200'
    });

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

    return count;
};

exports.autocompleteGames = function (query) {
    const elasticsearch = require('elasticsearch');
    const client = new elasticsearch.Client({
        host: 'elasticsearch:9200'
    });

    return client.search({
        q: query,
        index: 'games',
        type: 'game'
    }).then((data) => transformHitsToGames(data.hits.hits));
};