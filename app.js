var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Route includes
var new_reservation = require('./routes/new_reservation');
var new_reservation_existing = require('./routes/new_reservation_existing');
var update_reservation = require('./routes/update_reservation');
var cancel_reservation = require('./routes/cancel_reservation');
var map = require('./routes/map');
var customers = require('./routes/customers');
var site_info = require('./routes/site_info');
var selected_name_home = require('./routes/selected_name_home');
var selected_name_site = require('./routes/selected_name_site');
var date_conflicts_new = require('./routes/date_conflicts_new');
var date_conflicts_update = require('./routes/date_conflicts_update');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use('/new_reservation', new_reservation);
app.use('/new_reservation_existing', new_reservation_existing);
app.use('/update_reservation', update_reservation);
app.use('/cancel_reservation', cancel_reservation);
app.use('/map', map);
app.use('/customers', customers);
app.use('/site_info', site_info);
app.use('/selected_name_home', selected_name_home);
app.use('/selected_name_site', selected_name_site);
app.use('/date_conflicts_new', date_conflicts_new);
app.use('/date_conflicts_update', date_conflicts_update);

// Serve back static files
app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/scripts'));
app.use(express.static('public/styles'));
app.use(express.static('public/vendors'));

// App set
app.set('port', process.env.PORT || 3000);

// Listen
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});