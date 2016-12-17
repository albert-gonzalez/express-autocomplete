const assert = require('assert');
const sinon = require('sinon');
const GamesService = require('../../../src/service/games/games');
describe('games services', function() {
    describe('loadGamesFromJson', function() {
        it('should call create method and return the count of the loaded games in the indexer', function() {
            const indexerMock = { create: sinon.spy()};
            const gamesService = new GamesService(indexerMock);
            const json = [{id: 1}, {id: 2}];
            const count = gamesService.loadGamesFromJson(json);

            assert.equal(count, 2);
            assert(indexerMock.create.calledWith({
                index: 'games',
                type: 'game',
                id: json[0].id,
                body: json[0]
            }));
        });
    });

    describe('autocomplete', function() {
        it('should call the search method and return the result transformed', function(done) {
            const query = 'monster';
            const indexerReturnedData = {
                hits: {
                    hits: [
                        {
                            _source: {
                                id: 1,
                                name: 'Monster High',
                                site_detail_url: 'detail url'
                            }
                        },
                        {
                            _source: {
                                id: 2,
                                name: 'Monster Madness',
                                site_detail_url: 'monster detail url'
                            }
                        }
                    ]
                }
            };
            const indexerMock = {
                search: sinon.stub()
                    .returns(Promise.resolve(indexerReturnedData))
            };
            const gamesService = new GamesService(indexerMock);
            gamesService.autocomplete(query).then(games => {
                assert.deepEqual(games, [
                    indexerReturnedData.hits.hits[0]._source,
                    indexerReturnedData.hits.hits[1]._source
                ]);
                done();
            });
        });
    });
});