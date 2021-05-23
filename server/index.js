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
        (result.length ? clgResult(sqlQuery.clg, err) : runQuery('Fill')) :
        (clgResult(sqlQuery.clg, err, query === 'Select' || query === 'CheckIfMovieExists' ? appRes.send(result) : result)));
}

// db.query(sqlQuery.query, arr, (err, result) => result.length ? clgResult(sqlQuery.clg) : runQuery('Fill')); //* daca query ul este acesta : 'CheckIfTableHasRecords'
//* face un Select * din tabela, și result e rezultatul, dacă rezultatul e adevarat(mai mare ca 0) se afiseaza clg-ul, iar daca e 0 se umple tabela 
// db.query(sqlQuery.query, arr, (err, result) => clgResult(sqlQuery.clg, err, appRes.send(result))); //* daca query ul este acesta : 'Select' sau 'CheckIfMovieExists'
// db.query(sqlQuery.query, arr, (err, result) => clgResult(sqlQuery.clg, err)); //* pentru restul query-urilor

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
    runQuery('Insert', [movieName, movieReview]);
});

app.post('/api/check', (req, res) => {
    let movieName = req.body.movieName;
    runQuery('CheckIfMovieExists', movieName, res);
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