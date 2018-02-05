var Pipedrive = require('pipedrive');
var pipedrive = new Pipedrive.Client(process.env.PIPEDRIVE_API_TOKEN, {strictMode: true});

exports.getAll = function (callback) {
    pipedrive.Persons.getAll({}, function (err, persons) {
        if (err) throw err;
        callback(persons);
    });
};
