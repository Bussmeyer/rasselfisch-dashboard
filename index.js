var Config = require('dotenv').config();
var Persons = require('./pipedrive/persons');
var Blastit = require('./blastit/blastit');

var Pipedrive = require('pipedrive');
var Elasticsearch = require('elasticsearch');

var pipedrive = new Pipedrive.Client(process.env.PIPEDRIVE_API_TOKEN, {strictMode: true});

pipedrive.Deals.getAll({}, function (err, deals) {
    if (err) throw err;
    Blastit.toElasticsearch(deals);
});

Persons.getAll(function (persons) {
    console.log(persons);

    var client = new Elasticsearch.Client({
        host: process.env.ELASTICSEARCH_HOST,
        log: process.env.ELASTICSEARCH_LOGLEVEL
    });

    persons.forEach(function (person) {
        client.index({
            index: 'persons',
            type: 'person',
            id: person.id,
            body: {
                id: person.id,
                first_name: person.first_name,
                lastname: person.last_name,
                add_time: person.add_time,
                update_time: person.update_time,
            }
        }, function (error, response) {
            if (error) return console.log(error);
        });
    });
});
