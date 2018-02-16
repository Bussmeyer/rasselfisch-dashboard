var Elasticsearch = require('elasticsearch');

exports.toElasticsearch = function (elasticsearchObjects) {
    var client = new Elasticsearch.Client({
        host: process.env.ELASTICSEARCH_HOST,
        log: process.env.ELASTICSEARCH_LOGLEVEL
    });

    elasticsearchObjects.forEach(function (elasticsearchObject) {
        if (!!elasticsearchObject['48fb37075b475d243a63105efc2c430ada90162e']) {
            groups = elasticsearchObject['48fb37075b475d243a63105efc2c430ada90162e'].toString().split(",");
        }

        client.index({
            index: 'deals',
            type: 'deal',
            id: elasticsearchObject.id,
            body: {
                id: elasticsearchObject.id,
                person_id: elasticsearchObject.person_id,
                title: elasticsearchObject.title,
                value: elasticsearchObject.value,
                add_time: elasticsearchObject.add_time,
                update_time: elasticsearchObject.update_time,
                status: elasticsearchObject.status,
                pipeline_id: elasticsearchObject.pipeline_id,
                groups: groups
            }
        }, function (error, response) {
            if (error) return console.log(error);
        });
    });
};
