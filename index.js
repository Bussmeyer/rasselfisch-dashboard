require('dotenv').config()

var Deals = require('./deals');
var Elasticsearch = require('elasticsearch');

Deals.getAll(function(deals){
    var client = new Elasticsearch.Client({
      host: process.env.ELASTICSEARCH_HOST,
      log: process.env.ELASTICSEARCH_LOGLEVEL,
    });

    for (var i = 0; i < deals.length; i++) {
      if (!!deals[i]['48fb37075b475d243a63105efc2c430ada90162e']) {
          groups = deals[i]['48fb37075b475d243a63105efc2c430ada90162e'].toString().split(",");
      }

      client.index({
        index: 'deals',
        type: 'deal',
        id: deals[i].id,
        body: {
          id: deals[i].id,
          title: deals[i].title,
          value: deals[i].value,
          add_time: deals[i].add_time,
          update_time: deals[i].update_time,
          status: deals[i].status,
          groups: groups,
        }
      }, function (error, response) {

      });
    }
});
