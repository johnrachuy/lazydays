var express = require('express');
var router = express.Router();
var connectionString = require('../modules/connection');
var pg = require('pg');

router.post('/', function(req, res) {
    var addNewExist = {
        customer_id: req.body.customer_id,
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
        fk_customer_id: req.body.customer_id
    };

    pg.connect(connectionString, function(err, client, done) {
        client.query("UPDATE customer SET (first_name, last_name, phone, email, street_address, city, state, zip_code) = ($1, $2, $3, $4, $5, $6, $7, $8) WHERE customer_id = ($9)",
            [addNewExist.first_name, addNewExist.last_name, addNewExist.phone, addNewExist.email, addNewExist.street_address, addNewExist.city, addNewExist.state, addNewExist.zip_code, addNewExist.customer_id],
            function (err, result) {
                //console.log(result);
                done();
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    client.query("INSERT INTO reservation (site_number, check_in, check_out, site_class, people_num, pet_num, rate, tax, hold, notes, canceled, fk_customer_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
                        [addNewExist.site_number, addNewExist.check_in, addNewExist.check_out, addNewExist.site_class, addNewExist.people_num, addNewExist.pet_num, addNewExist.rate, addNewExist.tax, addNewExist.hold, addNewExist.notes, addNewExist.canceled, addNewExist.fk_customer_id],
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