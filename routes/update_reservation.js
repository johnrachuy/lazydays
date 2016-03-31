var express = require('express');
var router = express.Router();
var connectionString = require('../modules/connection');
var pg = require('pg');

router.put('/', function(req, res) {
    var updateEntry = {
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
        canceled: 'false',
        fk_customer_id: req.body.fk_customer_id,
        reservation_id: req.body.reservation_id
    };

    pg.connect(connectionString, function(err, client, done) {
        client.query("UPDATE customer SET (first_name, last_name, phone, email, street_address, city, state, zip_code) = ($1, $2, $3, $4, $5, $6, $7, $8) WHERE customer_id = ($9)",
            [updateEntry.first_name, updateEntry.last_name, updateEntry.phone, updateEntry.email, updateEntry.street_address, updateEntry.city, updateEntry.state, updateEntry.zip_code, updateEntry.fk_customer_id],
            function (err, result) {
                //console.log(result);
                done();
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    client.query("UPDATE reservation SET (site_number, check_in, check_out, site_class, people_num, pet_num, rate, tax, hold, notes, canceled, fk_customer_id) = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) WHERE reservation_id = ($13)",
                        [updateEntry.site_number, updateEntry.check_in, updateEntry.check_out, updateEntry.site_class, updateEntry.people_num, updateEntry.pet_num, updateEntry.rate, updateEntry.tax, updateEntry.hold, updateEntry.notes, updateEntry.canceled, updateEntry.fk_customer_id, updateEntry.reservation_id],
                        function (err, result) {
                            //console.log(result);
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