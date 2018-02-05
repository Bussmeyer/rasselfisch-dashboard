var request = require('request');

var options = {
    method: 'POST',
    url: 'https://api.sumup.com/token',
    headers: {'content-type': 'application/json'},
    body:
        {
            grant_type: 'client_credentials',
            client_id: '',
            client_secret: '',
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
