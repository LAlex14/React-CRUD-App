const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const sql = require('./sqlQueries');
const conData = require('./connectionData');

function clgResult(message, err = 0, result = 0) {
    if (err) throw err;
    console.log((new Date()).toUTCString() + " - " + message);
    result;
}

var db = mysql.createConnection(conData.connection);

db.connect((err) => {
    clgResult("Connected!", err);
    db.query(sql.CreateDatabase + `${conData.databaseName};`, (err) => clgResult("The database has been created", err));
    db.query(sql.UseDatabase + `${conData.databaseName};`, (err) => clgResult("The database has been selected", err));
    db.query(sql.CreateTable, (err) => clgResult("The table has been created", err));
    db.query(sql.CheckifTableIsEmpty, (err, result) => {
        clgResult(`The table ${result.length != true ? "is empty" : "has rows"}`, err);
        if (!result.length) db.query(sql.Fill, (err) => clgResult("The table has been filled", err));
    });
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/get', (req, res) => {
    db.query(sql.Select, (err, result) => clgResult("Rows selected", err, res.send(result)));
});

app.post('/api/insert', (req, res) => {
    let movieName = req.body.movieName;
    let movieReview = req.body.movieReview;
    db.query(sql.Insert, [movieName, movieReview], (err) => clgResult("Row inserted", err));
});

app.delete('/api/delete/:movieName', (req, res) => {
    let name = req.params.movieName;
    db.query(sql.Delete, name, (err) => clgResult("Row deleted", err));
});

app.put('/api/update', (req, res) => {
    let name = req.body.movieName;
    let review = req.body.movieReview;
    db.query(sql.Update, [review, name], (err) => clgResult("Row updated", err));
});

app.listen(3001, (err) => clgResult("running on port 3001", err));