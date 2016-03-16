var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pg = require('pg');
var connectionString = require('./modules/connection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/get_map/:date', function(req, res) {
    var results = [];
    var date = new Date(req.params.date).toISOString();

    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT site_number FROM reservation WHERE check_in <= ($1) AND check_out > ($1)',
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

app.get('/get_names', function(req, res) {
    var results = [];

    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT * FROM customer ORDER BY last_name ASC');

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

app.post('/post_res', function(req, res) {
    //console.log('New customer, new reservation');
    //console.log(req.body);

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
                //console.log(result);
                done();
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    client.query("INSERT INTO reservation (site_number, check_in, check_out, site_class, people_num, pet_num, rate, tax, hold, notes, canceled, fk_customer_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
                        [addEntry.site_number, addEntry.check_in, addEntry.check_out, addEntry.site_class, addEntry.people_num, addEntry.pet_num, addEntry.rate, addEntry.tax, addEntry.hold, addEntry.notes, addEntry.canceled, result.rows[0].customer_id],
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

app.post('/post_exist', function(req, res) {
    //console.log('Existing customer, new reservation');
    //console.log(req.body);

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

app.post('/update_res', function(req, res) {
    //console.log('Updating existing reservation');
    //console.log(req.body);

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

app.put('/cancel_res', function(req, res) {
    //console.log(req.body.id);

    var cancelEntry = {
        reservation_id: req.body.reservation_id
    };

    pg.connect(connectionString, function(err, client, done) {
        client.query("UPDATE reservation SET canceled = NOT canceled WHERE reservation_id = ($1)",
            [cancelEntry.reservation_id],
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

app.get('/get_site/:site_number', function(req, res) {
    var results = [];
    //console.log(req.params);

    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT * FROM customer JOIN reservation ON fk_customer_id=customer.customer_id WHERE site_number = ($1) ORDER BY reservation.check_in DESC',
            [req.params.site_number]);

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

app.get('/get_info/:selectedName', function(req, res) {
    var results = [];
    //console.log(req.params);

    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT * FROM customer JOIN reservation ON fk_customer_id=customer.customer_id WHERE fk_customer_id = ($1) ORDER BY reservation.check_in DESC',
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

app.get('/get_exist/:customer_id', function(req, res) {
    var results = [];
    //console.log(req.params);

    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT * FROM customer WHERE customer_id = ($1)',
            [req.params.customer_id]);

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

// Serve back static files
app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/scripts'));
app.use(express.static('public/styles'));
app.use(express.static('public/vendors'));

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});