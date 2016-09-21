var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3003;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

var appointments = [{

}];

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'app/public/home.html'));
});

app.get('/tables', function (req, res) {
    res.sendFile(path.join(__dirname, 'app/public/tables.html'));
});

app.get('/reserve', function (req, res) {
    res.sendFile(path.join(__dirname, 'app/public/reserve.html'));
});

app.get('/api/:reservation?', function (req, res) {
    var chosen = req.params.reservation;

    if (chosen) {
        console.log(chosen);

        for (var i = 0; i < appointments.length; i++) {
            if (chosen === appointments[i].routeName) {
                res.json(appointments[i]);
                return;
            }
        }

        res.json(false);
    } else {
        res.json(appointments);
    }
});



app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
});