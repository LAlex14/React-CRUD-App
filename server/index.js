const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const sql = require('./sqlQueries');
const conData = require('./connectionData');

function clgResult(message, err) {
    if (err) throw err;
    if (message) console.log((new Date()).toUTCString() + " - " + message);
}

function runQuery(query, arr, appRes) {
    let sqlQuery = eval(`sql.${query}`);
    db.query(sqlQuery.query, arr, (err, result) => query === 'CheckIfTableHasRecords' ?
        (result.length ? clgResult(sqlQuery.clg) : runQuery('Fill')) :
        (clgResult(sqlQuery.clg, err, query === 'Select' ? appRes.send(result) : result)));
}

var db = mysql.createConnection(conData.connection);

db.connect((err) => clgResult("Connected!", err));

['CreateDatabase', 'UseDatabase', 'CreateTable', 'CheckIfTableHasRecords'].forEach(el => runQuery(el));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/get', (req, res) => {
    runQuery('Select', undefined, res)
});

app.post('/api/insert', (req, res) => {
    let movieName = req.body.movieName;
    let movieReview = req.body.movieReview;
    runQuery('Insert', [movieName, movieReview])
});

app.delete('/api/delete/:movieName', (req, res) => {
    let movieName = req.params.movieName;
    runQuery('Delete', movieName)
});

app.put('/api/update', (req, res) => {
    let movieName = req.body.movieName;
    let movieReview = req.body.movieReview;
    runQuery('Update', [movieReview, movieName]);
});

app.listen(3001, (err) => clgResult("running on port 3001", err));