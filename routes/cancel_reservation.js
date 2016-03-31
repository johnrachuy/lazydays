var express = require('express');
var router = express.Router();
var connectionString = require('../modules/connection');
var pg = require('pg');

router.put('/', function(req, res) {

    pg.connect(connectionString, function(err, client, done) {
        client.query("UPDATE reservation SET canceled = NOT canceled WHERE reservation_id = ($1)",
            [req.body.reservation_id],
            function (err, result) {
                done();
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    res.send(result);
                }
            });
    });
});

module.exports = router;