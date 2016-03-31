var express = require('express');
var router = express.Router();
var connectionString = require('../modules/connection');
var pg = require('pg');

router.get('/', function(req, res) {
    var results = [];
    var check_out = new Date(req.query.check_out).toISOString();
    var check_in = new Date(req.query.check_in).toISOString();

    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT * FROM reservation WHERE (check_in < ($1) AND ($2) < check_out) AND site_number = ($3) AND reservation_id != ($4) AND canceled = false',
            [check_out, check_in, req.query.site_number, req.query.reservation_id]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);

        });

        // close connection
        query.on('end', function() {
            done();
            console.log(results);
            return res.json(results);

        });

        if(err) {
            console.log(err);
        }
    });
});

module.exports = router;