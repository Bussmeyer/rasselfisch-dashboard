var Elasticsearch = require('elasticsearch');

var client = new Elasticsearch.Client({
    host: process.env.ELASTICSEARCH_HOST,
    log: process.env.ELASTICSEARCH_LOGLEVEL
});

client.indices.delete({
    ignoreUnavailable: true,
    index: 'deals'
}, function (error, response) {
    if (error) return console.log(error);
    client.indices.create({
        waitForActiveShards: 2,
        updateAllTypes: true,
        index: 'deals',
        body: {
            "mappings": {
                "deal": {
                    "properties": {
                        "id": {
                            "type": "integer"
                        },
                        "title": {
                            "type": "text"
                        },
                        "value": {
                            "type": "scaled_float",
                            "scaling_factor": 100
                        },
                        "add_time": {
                            "type": "date",
                            "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
                        },
                        "update_time": {
                            "type": "date",
                            "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
                        }
                    }
                }
            }
        }
    }, function (error, response) {
        if (error) return console.log(error);
    });
});

client.indices.delete({
    ignoreUnavailable: true,
    index: 'persons'
}, function (error, response) {
    if (error) return console.log(error);
    client.indices.create({
        waitForActiveShards: 2,
        updateAllTypes: true,
        index: 'persons',
        body: {
            "mappings": {
                "person": {
                    "properties": {
                        "id": {
                            "type": "integer"
                        },
                        "add_time": {
                            "type": "date",
                            "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
                        },
                        "update_time": {
                            "type": "date",
                            "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
                        }
                    }
                }
            }
        }
    }, function (error, response) {
        if (error) return console.log(error);
    });
});
