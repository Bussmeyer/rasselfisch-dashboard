var Pipedrive = require('pipedrive');
var pipedrive = new Pipedrive.Client(process.env.PIPEDRIVE_API_TOKEN, { strictMode: true });

exports.getAll = function (callback) {
  pipedrive.Deals.getAll({}, function(err, deals) {
    if (err) throw err;
    return callback(deals);
  });
};
