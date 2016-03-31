var express = require('express');
var router = express.Router();
var connectionString = require('../modules/connection');
var pg = require('pg');

router.post('/', function(req, res) {
    var addEntry = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        street_address: req.body.street_address,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        site_number: req.body.site_number,
        check_in: req.body.check_in,
        check_out: req.body.check_out,
        site_class: req.body.site_class,
        people_num: req.body.people_num,
        pet_num: req.body.pet_num,
        rate: req.body.rate,
        tax: req.body.tax,
        hold: req.body.hold,
        notes: req.body.notes,
        canceled: 'false'
    };

    pg.connect(connectionString, function(err, client, done) {
        client.query("INSERT INTO customer (first_name, last_name, phone, email, street_address, city, state, zip_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING customer_id",
            [addEntry.first_name, addEntry.last_name, addEntry.phone, addEntry.email, addEntry.street_address, addEntry.city, addEntry.state, addEntry.zip_code],
            function (err, result) {
                done();
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    client.query("INSERT INTO reservation (site_number, check_in, check_out, site_class, people_num, pet_num, rate, tax, hold, notes, canceled, fk_customer_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
                        [addEntry.site_number, addEntry.check_in, addEntry.check_out, addEntry.site_class, addEntry.people_num, addEntry.pet_num, addEntry.rate, addEntry.tax, addEntry.hold, addEntry.notes, addEntry.canceled, result.rows[0].customer_id],
                        function (err, result) {
                            done();
                            if(err) {
                                console.log("Error inserting data: ", err);
                                res.send(false);
                            } else {
                                res.send(result);
                            }
                        });
                }
            });
    });
});

module.exports = router;