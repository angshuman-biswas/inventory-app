const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const conn = require('./connect');
const app = express();
app.use(bodyParser.json());
app.use(cors());

function createTables() {
    conn.query(`CREATE TABLE IF NOT EXISTS Items (item_id MEDIUMINT NOT NULL AUTO_INCREMENT,` +
        `item_name VARCHAR(255) NOT NULL DEFAULT 'unknown_item',PRIMARY KEY (item_id));`,
        function (err) {
            if (err) throw err;
            console.log('Created Items table.');
        });

    conn.query(`CREATE TABLE IF NOT EXISTS Locations (location_id MEDIUMINT NOT NULL AUTO_INCREMENT,` +
        `location_name VARCHAR(64) NOT NULL DEFAULT 'unknown_location',PRIMARY KEY (location_id));`,
        function (err) {
            if (err) throw err;
            console.log('Created Locations table.');
        });

    // conn.query(``, function (err) {
    //     if (err) throw err;
    //     console.log('\nCreated Items table.');
    // });

    // conn.query(``, function (err) {
    //     if (err) throw err;
    //     console.log('\nCreated Items table.');
    // });
    // conn.end(function (err) {
    //     if (err) {
    //         console.log('Error in ending the connection: ', err);
    //     }
    // });
}

createTables();

app.get('/items', (req, res) => {
    conn.query('SELECT * from Items', function (err, result) {
        if (err) throw err;
        let finalResult = (result && result.length) ? result : [];
        console.log('[GET] fetched items list successfully.');
        res.status(200).send({ result: finalResult });
    });
});

app.get('/items/:id', (req, res) => {
    conn.query('SELECT * from Items WHERE item_id=?', [req.params.id],
        function (err, result) {
            if (err) throw err;
            let finalResult = (result && result.item_id) ? result : null;
            console.log('[GET] fetched item with id: ' + req.params.id + ' successfully.');
            res.status(200).send({ result: finalResult });
        });
});

app.post('/items/create', (req, res) => {});

app.put('/items/update/:id', (req, res) => {
    conn.query(`UPDATE Items SET item_name=? WHERE item_id=?`, [req.body.value, req.params.id],
        function (err, result) {
            if (err) throw err;
            console.log('[POST] item with id: ' + req.params.id + ' value updated to ' + req.body.value + ' successfully.'
                + '\n' + result.affectedRows + ' record(s) affected.');
            res.status(200).send(req.body);
        });
});


app.delete('/items/:id', (req, res) => {
    conn.query(`DELETE FROM Items WHERE item_id=?`, [req.body.value, req.params.id],
        function (err, result) {
            if (err) throw err;
            console.log('[DELETE] item with id: ' + req.params.id + ' deleted successfully.'
                + '\n' + result.affectedRows + ' record(s) affected.');
            res.status(200).send(req.body);
        });
});

// CRUD APIs for Locations
app.get('/locations', (req, res) => {
    conn.query('SELECT * from Locations', function (err, result) {
        if (err) throw err;
        let finalResult = (result && result.length) ? result : [];
        console.log('GET locations list successful.');
        res.status(200).send({ result: finalResult });
    });
});

app.get('/locations/:id', (req, res) => {
    conn.query('SELECT * from Locations WHERE location_id=?', [req.params.id], function (err, result) {
        if (err) throw err;
        let finalResult = (result && result.item_id) ? result : null;
        console.log('GET location with id: ' + req.params.id + ' successful.');
        res.status(200).send({ result: finalResult });
    });
});

app.post('/locations/create', (req, res) => {});


app.put('/locations/update/:id', (req, res) => {
    conn.query(`UPDATE Locations SET location_name=? WHERE location_id=?`, [req.body.value, req.params.id],
        function (err, result) {
            if (err) throw err;
            console.log('[POST] location with id: ' + req.params.id + ' value updated to ' + req.body.value + ' successfully.'
                + '\n' + result.affectedRows + ' record(s) affected.');
            res.status(200).send(req.body);
        });
});


app.delete('/locations/:id', (req, res) => {
    conn.query(`DELETE FROM Locations WHERE location_id=?`, [req.body.value, req.params.id],
        function (err, result) {
            if (err) throw err;
            console.log('[DELETE] location with id: ' + req.params.id + ' deleted successfully.'
                + '\n' + result.affectedRows + ' record(s) affected.');
            res.status(200).send(req.body);
        });
});

// CRUD APIs for Stock
app.get('/stock', (req, res) => { });

app.get('/stock/:id', (req, res) => { });

app.post('/stock/:id', (req, res) => { });

app.put('/stock/:id', (req, res) => { });

app.delete('/stock/:id', (req, res) => { });

// CRUD APIs for Purchases
app.get('/purchases', (req, res) => { });

app.get('/purchases/:id', (req, res) => { });

app.post('/purchases/:id', (req, res) => { });

app.put('/purchases/:id', (req, res) => { });

app.delete('/purchases/:id', (req, res) => { });


// Server to listen for requests on port 9090
app.listen(9090, () => {
    console.log('Listening on port 9090');
});