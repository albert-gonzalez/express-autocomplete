const hulken = require('hulken');
const randomWord = require('random-word');

const requests = [];

for(let i = 0; i < 800; i++) {
    requests.push({
        method: 'get',
        path: `/api/games/autocomplete?q=${randomWord()}`
    });
}

const hulken_options = {
    targetUrl: 'http://localhost:8888',
    requestsArray: JSON.stringify(requests)
};

hulken.run(function(stats){
    console.log('error ... perhaps i should look closer at the stats');
},function(stats){
    console.log('success! ... auto tweet my stats to the world!');
},hulken_options);