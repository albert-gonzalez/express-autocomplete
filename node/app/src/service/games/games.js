function transformHitsToGames(hits) {
    return hits.map((hit) => ({
        id: hit._source.id,
        name: hit._source.name,
        site_detail_url: hit._source.site_detail_url
    }));
}

module.exports = class GamesService {
    constructor(indexerClient) {
        this.indexerClient = indexerClient;
    }

    loadGamesFromJson(games) {
        let count = 0;
        for (let game of games) {
            this.indexerClient.create({
                index: 'games',
                type: 'game',
                id: game.id,
                body: game
            });

            count++;
        }

        return count;
    }

    autocomplete(query) {
        return this.indexerClient.search({
            index: 'games',
            type: 'game',
            body: {
                "query": {
                    "bool": {
                        "should": [
                            {
                                "match": {
                                    "name.autocomplete": {
                                        "query": query,
                                        "operator": "and",
                                        "boost": 3
                                    }
                                }
                            },
                            {
                                "match": {
                                    "description": {
                                        "query": query,
                                        "operator": "and"
                                    }
                                }
                            }
                        ],
                        "minimum_should_match": 1
                    }
                }
            }
        }).then((data) => transformHitsToGames(data.hits.hits));
    }
};