require('dotenv').config()

var Elasticsearch = require('elasticsearch');
var Pipedrive = require('pipedrive');

var pipedrive = new Pipedrive.Client(process.env.PIPEDRIVE_API_TOKEN, { strictMode: true });
var client = new Elasticsearch.Client({
  host: process.env.ELASTICSEARCH_HOST,
  log: process.env.ELASTICSEARCH_LOGLEVEL,
});

pipedrive.Deals.getAll({}, function(err, deals) {
    if (err) throw err;

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
