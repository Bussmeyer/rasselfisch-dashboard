var Config = require('dotenv').config();
var request = require('request');

var options = {
    method: 'POST',
    url: 'https://api.sumup.com/token',
    headers: {'content-type': 'application/json'},
    body:
        {
            grant_type: 'password',
            username: process.env.SUMUP_USER,
            password: process.env.SUMUP_PASS,
            client_id: process.env.SUMUP_CLIENT_ID,
            client_secret: process.env.SUMUP_CLIENT_SECRET,
            scope: 'transactions.history'
        },
    json: true
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);

    request({
        url: 'https://api.sumup.com/v0.1/me/transactions/history?limit=10',
        auth: {
            'bearer': body.access_token
        }
    }, function (err, res) {
        console.log(res.body);
    });
});
