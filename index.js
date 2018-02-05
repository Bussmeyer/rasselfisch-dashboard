var Config = require('dotenv').config();
var Deals = require('./pipedrive/deals');
var Blastit = require('./blastit');

Deals.getAll(function (deals) {
    Blastit.toElasticsearch(deals);
});
