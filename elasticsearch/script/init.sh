#!/bin/bash
curl -XPUT 'localhost:9200/games' -d @elasticsearch/schema/games.json
curl -GET 'localhost:8888/api/games/load'