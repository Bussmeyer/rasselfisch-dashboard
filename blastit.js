var Elasticsearch = require('elasticsearch');

exports.toElasticsearch = function (deals) {
    var client = new Elasticsearch.Client({
        host: process.env.ELASTICSEARCH_HOST,
        log: process.env.ELASTICSEARCH_LOGLEVEL
    });

    deals.forEach(function (deal) {
        if (!!deal['48fb37075b475d243a63105efc2c430ada90162e']) {
            groups = deal['48fb37075b475d243a63105efc2c430ada90162e'].toString().split(",");
        }

        client.index({
            index: 'deals',
            type: 'deal',
            id: deal.id,
            body: {
                id: deal.id,
                title: deal.title,
                value: deal.value,
                add_time: deal.add_time,
                update_time: deal.update_time,
                status: deal.status,
                groups: groups
            }
        }, function (error, response) {
            if (error) return console.log(error);
        });
    });
};
