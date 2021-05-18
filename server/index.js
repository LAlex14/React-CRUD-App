const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const connection = {
    host: "localhost",
    user: "root",
    password: "1234-QWEasd"
}
const databaseName = "reactcrudapp";

function clgResult(message, err = 0, result = 0) {
    if (err) throw err;
    console.log(message);
    result;
}

function checkIfEmpty() {
    let sqlCheck = "SELECT * FROM movie_reviews LIMIT 1";
    db.query(sqlCheck, (err, result) => clgResult(`Table is ${result.length != true ? "empty" : "filled"}`, err, fillIfEmpty(result.length != true)));
}

function fillIfEmpty(isEmpty) {
    if (isEmpty) {
        let sqlFill = "INSERT INTO movie_reviews(movieName, movieReview) VALUES ('Blade Runner 2049','Also like the first film (which, yes, you should see first), it’s visually rich and culturally intriguing. A worthy sequel. 8/10'),('Avengers: Infinity War', 'Despite the vast cast and multi-stranded plot that looks bewildering on paper, this does kind of work. 7/10'),('Baby Driver', 'Is beautifully choreographed and cut to the beat of the mostly 1960s and ’70s tracks. Above all, it’s fun. 8/10'),('Mission: Impossible – Fallout', 'If this does turn out to be Tom Cruise’s swansong in the lead role, though, it wouldn’t be a bad way to finish. 8/10'),('Murder on the Orient Express', 'It’s pleasant enough family viewing. Especially if the more aged family members have lost this particular plot. 6/10'),('What We Did on Our Holiday', 'Otherwise, this is a pacy, witty film that creatively expands the storyworld while still keeping the fans happy. 8/10'),('Mad Max: Fury Road', 'In the spirit of the original film it has plenty of black humour, too, but don’t expect story twists or deep characterisation (Max: mad). 7/10'),('Monty Python Live', 'At over two hours long plus interval, it probably warrants a 4/10 rating, but for their undoubted influence on my own humour, I’ll give it 6/10.'),('Guardians of the Galaxy', 'It’s all very Star Wars and the characters aren’t quite as likeable as they’re supposed to be, but there are a few laughs and original visuals. 7/10'),('The Big Sick', 'Based on Nanjiani and Emily Gordon’s real life and written by them, this is a funny and touching story with an absolutely terrible title but a great cast. 8/10'),('Midnight Special', 'The result is a film that’s a bit like Close Encounters of the Third Kind but without the humour, tension or any kind of deeper message. 5/10'); ";
        db.query(sqlFill, (err) => clgResult("Table filled", err));
    }
}

var db = mysql.createConnection(connection);

db.connect((err) => {
    clgResult("Connected!", err);
    db.query(`CREATE DATABASE IF NOT EXISTS ${databaseName};`, (err) => clgResult("Database created", err));
    db.query(`USE ${databaseName};`, (err) => clgResult("Database selected", err));
    sqlCreateTable = "CREATE TABLE IF NOT EXISTS movie_reviews (`id` INT NOT NULL AUTO_INCREMENT, `movieName` VARCHAR(45) NOT NULL, `movieReview` TEXT(300) NOT NULL, PRIMARY KEY (`id`));";
    db.query(sqlCreateTable, (err) => clgResult("Table created", err));
    checkIfEmpty();
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/get', (req, res) => {
    const sqlSelect = 'SELECT * FROM movie_reviews;';

    db.query(sqlSelect, (err, result) => clgResult("Rows selected", err, res.send(result)));
});

app.post('/api/insert', (req, res) => {
    let movieName = req.body.movieName;
    let movieReview = req.body.movieReview;
    let sqlInsert = 'Insert INTO movie_reviews (movieName, movieReview) VALUES (?,?);';

    db.query(sqlInsert, [movieName, movieReview], (err) => clgResult("Row inserted", err));
});

app.delete('/api/delete/:movieName', (req, res) => {
    let name = req.params.movieName;
    let sqlDelete = 'DELETE FROM movie_reviews WHERE movieName = ?;';

    db.query(sqlDelete, name, (err) => clgResult("Row deleted", err));
});

app.put('/api/update', (req, res) => {
    let name = req.body.movieName;
    let review = req.body.movieReview;
    let sqlUpdate = 'UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?;';

    db.query(sqlUpdate, [review, name], (err) => clgResult("Row updated", err));
});

app.listen(3001, (err) => clgResult("running on port 3001", err));