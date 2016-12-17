# Express Autocomplete Server

Server side Autocomplete example with Express.js, Elasticsearch and Docker. Frontend side done with vue.js and foundation.

## Install

* clone this repo
* `cd name-of-the-project-folder`
* Run the containers with `docker-compose up`
* Create the elasticsearch schema and load the documents with `elasticsearch/script/init.sh`
* open `http://localhost:8888` in the browser to try the example

## Server Endpoints

* **/api/load**: Load the documents from the file node/app/data/games.json
* **/api/autocomplete**: Search in the elastic index
* **/**: Autocomplete example page