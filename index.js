var Config = require('dotenv').config();
var Deals = require('./deals');
var Blastit = require('./blastit');

Deals.getAll(function (deals) {
    Blastit.toElasticsearch(deals);
});
