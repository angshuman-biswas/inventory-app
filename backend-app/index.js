const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
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

    conn.query(`CREATE TABLE IF NOT EXISTS Stock (stock_id MEDIUMINT NOT NULL REFERENCES Items(item_id),` +
        `location_id MEDIUMINT REFERENCES Locations(location_id),quantity SMALLINT CHECK (quantity > 0),` +
        ` PRIMARY KEY (stock_id, location_id));`,
        function (err) {
            if (err) throw err;
            console.log('Created Stock table.');
        });

    conn.query(`CREATE TABLE IF NOT EXISTS Purchases (PO_No VARCHAR(64) NOT NULL, item_id MEDIUMINT REFERENCES ` +
        `Items(item_id),quantity SMALLINT CHECK (quantity > 0),PRIMARY KEY (PO_No, item_id));`,
        function (err) {
            if (err) throw err;
            console.log('Created Purchases table.');
        });
}

createTables();

app.get('/items', (req, res) => {
    conn.query('SELECT * from Items', function (err, result) {
        if (err) {
            console.log('Error: ' + err.sqlMessage);
            res.status(500).send(
                {
                    success: false,
                    message: err.sqlMessage,
                    error: err.code
                });
            return;
        }
        let finalResult = (result && result.length) ? result : [];
        console.log('[GET] items list retrieved successfully.');
        res.status(200).send({ success: true, result: finalResult });
    });
});

app.get('/items/:id', (req, res) => {
    conn.query('SELECT * from Items WHERE item_id=?', [req.params.id],
        function (err, result) {
            if (err) {
                console.log('Error: ' + err.sqlMessage);
                res.status(500).send(
                    {
                        success: false,
                        message: err.sqlMessage,
                        error: err.code
                    });
                return;
            }
            let finalResult = (result && result.item_id) ? result : null;
            console.log('[GET] item with id: ' + req.params.id + ' retrieved successfully.');
            res.status(200).send({ success: true, result: finalResult });
        });
});

app.post('/items/create', (req, res) => {
    conn.query(`INSERT INTO Items (item_name) VALUES (?)`, [req.body.value], function (err, result) {
        if (err) {
            console.log('Error: ' + err.sqlMessage);
            res.status(500).send(
                {
                    success: false,
                    message: err.sqlMessage,
                    error: err.code
                });
            return;
        }
        console.log('[POST] new item "' + req.body.value + '" inserted successfully.');
        res.status(200).send({ success: true, id: result.insertId, value: req.body.value });
    });
});

app.put('/items/update/:id', (req, res) => {
    conn.query(`UPDATE Items SET item_name=? WHERE item_id=?`, [req.body.value, req.params.id],
        function (err, result) {
            if (err) {
                console.log('Error: ' + err.sqlMessage);
                res.status(500).send(
                    {
                        success: false,
                        message: err.sqlMessage,
                        error: err.code
                    });
                return;
            }
            console.log('[PUT] item with id: ' + req.params.id + ' value updated to ' + req.body.value + ' successfully.'
                + '\n' + result.affectedRows + ' record(s) affected.');
            res.status(200).send(req.body);
        });
});


app.delete('/items/:id', (req, res) => {
    conn.query(`DELETE FROM Items WHERE item_id=?`, [req.body.value, req.params.id],
        function (err, result) {
            if (err) {
                console.log('Error: ' + err.sqlMessage);
                res.status(500).send(
                    {
                        success: false,
                        message: err.sqlMessage,
                        error: err.code
                    });
                return;
            }
            console.log('[DELETE] item with id: ' + req.params.id + ' deleted successfully.'
                + '\n' + result.affectedRows + ' record(s) affected.');
            res.status(200).send({ success: true, affectedRows: result.affectedRows });
        });
});

// CRUD APIs for Locations
app.get('/locations', (req, res) => {
    conn.query('SELECT * from Locations', function (err, result) {
        if (err) {
            console.log('Error: ' + err.sqlMessage);
            res.status(500).send(
                {
                    success: false,
                    message: err.sqlMessage,
                    error: err.code
                });
            return;
        }
        let finalResult = (result && result.length) ? result : [];
        console.log('[GET] locations list retrieved successfully.');
        res.status(200).send({ success: true, result: finalResult });
    });
});

app.get('/locations/:id', (req, res) => {
    conn.query('SELECT * from Locations WHERE location_id=?', [req.params.id], function (err, result) {
        if (err) {
            console.log('Error: ' + err.sqlMessage);
            res.status(500).send(
                {
                    success: false,
                    message: err.sqlMessage,
                    error: err.code
                });
            return;
        }
        let finalResult = (result && result.item_id) ? result : null;
        console.log('[GET] location with id: ' + req.params.id + ' retrieved successfully.');
        res.status(200).send({ success: true, result: finalResult });
    });
});

app.post('/locations/create', (req, res) => {
    conn.query(`INSERT INTO Locations (location_name) VALUES (?)`, [req.body.value], function (err, result) {
        if (err) {
            console.log('Error: ' + err.sqlMessage);
            res.status(500).send(
                {
                    success: false,
                    message: err.sqlMessage,
                    error: err.code
                });
            return;
        }
        console.log('[POST] new location "' + req.body.value + '" inserted successfully.');
        res.status(200).send({ success: true, id: result.insertId, value: req.body.value });
    });
});


app.put('/locations/update/:id', (req, res) => {
    conn.query(`UPDATE Locations SET location_name=? WHERE location_id=?`, [req.body.value, req.params.id],
        function (err, result) {
            if (err) {
                console.log('Error: ' + err.sqlMessage);
                res.status(500).send(
                    {
                        success: false,
                        message: err.sqlMessage,
                        error: err.code
                    });
                return;
            }
            console.log('[PUT] location with id: ' + req.params.id + ' value updated to ' + req.body.value + ' successfully.'
                + '\n' + result.affectedRows + ' record(s) affected.');
            res.status(200).send(req.body);
        });
});


app.delete('/locations/:id', (req, res) => {
    conn.query(`DELETE FROM Locations WHERE location_id=?`, [req.body.value, req.params.id],
        function (err, result) {
            if (err) {
                console.log('Error: ' + err.sqlMessage);
                res.status(500).send(
                    {
                        success: false,
                        message: err.sqlMessage,
                        error: err.code
                    });
                return;
            }
            console.log('[DELETE] location with id: ' + req.params.id + ' deleted successfully.'
                + '\n' + result.affectedRows + ' record(s) affected.');
            res.status(200).send({ success: true, affectedRows: result.affectedRows });
        });
});

// CRUD APIs for Stock
app.get('/stock', (req, res) => {
    conn.query(`SELECT it.item_id, it.item_name, l.location_name FROM Stock st LEFT JOIN Items it ON it.item_id=st.stock_id LEFT JOIN Locations l ON l.location_id=st.location_id`,
        function (err, result) {
            if (err) {
                console.log('Error: ' + err.sqlMessage);
                res.status(500).send(
                    {
                        success: false,
                        message: err.sqlMessage,
                        error: err.code
                    });
                return;
            }
            let finalResult = (result && result.length) ? result : [];
            console.log('[GET] stock list retrieved successfully.');
            res.status(200).send({ success: true, result: finalResult });
        });
});

app.get('/stock/:id', (req, res) => {
    conn.query(`select it.item_id, it.item_name, st.quantity, l.location_name from Stock st LEFT JOIN Items it` +
        ` ON it.item_id=st.stock_id LEFT JOIN Locations l ON l.location_id=st.location_id WHERE it.item_id=?`,
        [req.params.id], function (err, result) {
            if (err) {
                console.log('Error: ' + err.sqlMessage);
                res.status(500).send(
                    {
                        success: false,
                        message: err.sqlMessage,
                        error: err.code
                    });
                return;
            }
            console.log('[GET] stock item with id: ' + req.params.id + ' retrieved successfully.');
            res.status(200).send({ success: true, result });
        });
});

app.post('/stock/create', (req, res) => {
    conn.query(`INSERT INTO Stock (stock_id, location_id, quantity) VALUES (?,?,?)`,
        [req.body.stockId, req.body.locationId, req.body.quantity],
        function (err, result) {
            if (err) {
                console.log('Error: ' + err.sqlMessage);
                res.status(500).send(
                    {
                        success: false,
                        message: err.sqlMessage,
                        error: err.code
                    });
                return;
            }
            console.log('[POST] new stock inserted successfully.');
            res.status(200).send(
                {
                    success: true,
                    stockId: req.body.stockId,
                    locationId: req.body.locationId,
                    quantity: req.body.quantity
                }
            );
        });
});

app.put('/stock/update', (req, res) => {
    conn.query(`UPDATE Stock SET quantity=? WHERE stock_id=? AND location_id=?`,
        [req.body.quantity, req.body.stockId, req.body.locationId],
        function (err, result) {
            if (err) {
                console.log('Error: ' + err.sqlMessage);
                res.status(500).send(
                    {
                        success: false,
                        message: err.sqlMessage,
                        error: err.code
                    });
                return;
            }
            console.log('[PUT] stock with id: ' + req.body.stockId + ' and location id: ' + req.body.locationId
                + ' quantity updated to ' + req.body.quantity + ' units successfully.'
                + '\n' + result.affectedRows + ' record(s) affected.');
            res.status(200).send(req.body);
        });
});

app.delete('/stock/:id/:lid', (req, res) => {
    conn.query(`DELETE FROM Stock WHERE stock_id=? AND location_id=?`, [req.params.id, req.params.lid],
        function (err, result) {
            if (err) {
                console.log('Error: ' + err.sqlMessage);
                res.status(500).send(
                    {
                        success: false,
                        message: err.sqlMessage,
                        error: err.code
                    });
                return;
            }
            console.log('[DELETE] stock item with id: ' + req.params.id + ' deleted successfully.'
                + '\n' + result.affectedRows + ' record(s) affected.');
            res.status(200).send({ success: true, affectedRows: result.affectedRows });
        });
});

// CRUD APIs for Purchases
app.get('/purchases', (req, res) => {
    conn.query(`SELECT p.PO_No, p.item_id, it.item_name, p.quantity FROM Purchases p LEFT JOIN Items it ON p.item_id=it.item_id`,
        function (err, result) {
            if (err) {
                console.log('Error: ' + err.sqlMessage);
                res.status(500).send(
                    {
                        success: false,
                        message: err.sqlMessage,
                        error: err.code
                    });
                return;
            }
            let finalResult = (result && result.length) ? result : [];
            console.log('[GET] list of all purchases retrieved successfully.');
            res.status(200).send({ success: true, result: finalResult });
        });
});

app.get('/purchases/:id', (req, res) => {
    conn.query(`SELECT p.PO_No, p.item_id, it.item_name, p.quantity FROM Purchases p LEFT JOIN Items it ON ` +
        `p.item_id=it.item_id WHERE p.PO_No=?`, [req.params.id],
        function (err, result) {
            if (err) {
                console.log('Error: ' + err.sqlMessage);
                res.status(500).send(
                    {
                        success: false,
                        message: err.sqlMessage,
                        error: err.code
                    });
                return;
            }
            let finalResult = (result && result.length) ? result : [];
            console.log('[GET] purchases with PO_No ' + req.params.id + ' retrieved successfully.');
            res.status(200).send({ success: true, result: finalResult });
        });
});

app.post('/purchases/create', async (req, res) => {
    const id = crypto.randomBytes(32).toString('hex');
    const values = req.body.values.map(elem => [id, elem[0], elem[1]]);
    conn.query(`INSERT INTO Purchases (PO_No, item_id, quantity) VALUES ?`, [values], function (err, result) {
        if (err) {
            console.log('Error: ' + err.sqlMessage);
            res.status(500).send(
                {
                    success: false,
                    message: err.sqlMessage,
                    error: err.code
                });
            return;
        }
        console.log('[POST] new purchase inserted successfully.');
        res.status(200).send({ success: true, PO_No: id });
    });

    await values.forEach(val => {
        conn.query(`UPDATE Stock s SET s.quantity=s.quantity-? WHERE s.stock_id=? AND s.quantity > 0 AND s.location_id IN` +
            `(SELECT s2.location_id FROM (SELECT s1.location_id, s1.quantity FROM Stock s1 WHERE s1.stock_id=?` +
            ` ORDER BY quantity DESC LIMIT 1) as s2);`, [val[2], val[1], val[1]], function (err, result) {
                if (err) {
                    console.log('Error: ' + err.sqlMessage);
                    res.status(500).send(
                        {
                            success: false,
                            message: err.sqlMessage,
                            error: err.code
                        });
                    return;
                }
            });
    });

});

app.delete('/purchases/:id', (req, res) => {
    conn.query(`DELETE FROM Purchases WHERE PO_No=?`, [req.params.id],
        function (err, result) {
            if (err) {
                console.log('Error: ' + err.sqlMessage);
                res.status(500).send(
                    {
                        success: false,
                        message: err.sqlMessage,
                        error: err.code
                    });
                return;
            }
            console.log('[DELETE] purchase with id: ' + req.params.id + ' deleted successfully.'
                + '\n' + result.affectedRows + ' record(s) affected.');
            res.status(200).send({ success: true, affectedRows: result.affectedRows });
        });
});

/** Print all PO_nos that have purchased a given item, and for each PO, print the number of
those items that have been purchased with that PO. */
app.get('/purchaseDetailsPerItem/:id', (req, res) => {
    conn.query(`SELECT p.PO_No, p.quantity from Purchases p WHERE p.item_id=?`, [req.params.id],
        function (err, result) {
            if (err) {
                console.log('Error: ' + err.sqlMessage);
                res.status(500).send(
                    {
                        success: false,
                        message: err.sqlMessage,
                        error: err.code
                    });
                return;
            }
            console.log('[POST] purchase details for item with id: ' + req.params.id + ' retrieved successfully.');
            res.status(200).send({ success: true, result });
        });
});

// Server to listen for requests on port 9090
app.listen(9090, () => {
    console.log('Listening on port 9090');
});