var express = require('express');
var router = express.Router();
var connectionString = require('../modules/connection');
var pg = require('pg');

router.get('/:date', function(req, res) {
    var results = [];
    var date = new Date(req.params.date).toISOString();

    pg.connect(connectionString, function(err, client, done) {
        console.log(client);
        var query = client.query('SELECT site_number, site_class FROM reservation WHERE check_in <= ($1) AND check_out > ($1) AND canceled = false',
            [date]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // close connection
        query.on('end', function() {
            done();
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }
    });
});

module.exports = router;