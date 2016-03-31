var express = require('express');
var router = express.Router();
var connectionString = require('../modules/connection');
var pg = require('pg');

router.get('/:selectedName', function(req, res) {
    var results = [];

    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT * FROM customer JOIN reservation ON fk_customer_id=customer.customer_id WHERE fk_customer_id = ($1) AND canceled = false ORDER BY reservation.check_in DESC',
            [req.params.selectedName]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // close connection
        query.on('end', function() {
            done();
            //console.log(results);
            return res.json(results);

        });

        if(err) {
            console.log(err);
        }
    });
});

module.exports = router;