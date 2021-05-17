const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const password = "1234-QWEasd";
const databaseName = "reactcrudapp";

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: password
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`, function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
    sql = "CREATE TABLE IF NOT EXISTS `" + databaseName + "`.`movie_reviews` (`id` INT NOT NULL AUTO_INCREMENT, `movieName` VARCHAR(45) NOT NULL, `movieReview` VARCHAR(100) NOT NULL, PRIMARY KEY (`id`));";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});

const db = mysql.createPool({
    user: "root",
    host: "localhost",
    password: password,
    database: databaseName,
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//     const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('inception','good movie'); ";
//     db.query(sqlInsert, (err, result) => {
//         if (err)
//             res.send(err);
//         else res.send("hello world ");
//     });
// });

app.get('/api/get', (req, res) => {
    const sqlSelect = 'SELECT * FROM reactcrudapp.movie_reviews;';
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.post('/api/insert', (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const sqlInsert = 'Insert INTO movie_reviews (movieName, movieReview) VALUES (?,?);';
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(err);
    });
});

app.delete('/api/delete/:movieName', (req, res) => {
    const name = req.params.movieName;
    const sqlDelete = 'DELETE FROM movie_reviews WHERE movieName = ?;';

    db.query(sqlDelete, name, (err, result) => {
        if (err)
            console.log(err)
    });
});

app.put('/api/update', (req, res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = 'UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?;';

    db.query(sqlUpdate, [review, name], (err, result) => {
        if (err)
            console.log(err)
    });
});

app.listen(3001, () => {
    console.log("running on port 3001 ");
});
