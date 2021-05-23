const conData = require('./connectionData');
const fillData = require('./fillData');

module.exports = {
    CreateDatabase: {
        query: `CREATE DATABASE IF NOT EXISTS ${conData.databaseName};`,
        clg: "The database is ready"
    },
    UseDatabase: {
        query: `USE ${conData.databaseName};`,
        clg: "The database has been selected for use"
    },
    CreateTable: {
        query: "CREATE TABLE IF NOT EXISTS movie_reviews (`id` INT NOT NULL AUTO_INCREMENT, `movieName` VARCHAR(45) NOT NULL, `movieReview` TEXT(300) NOT NULL, PRIMARY KEY (`id`));",
        clg: "The table is ready"
    },
    CheckIfTableHasRecords: {
        query: "SELECT * FROM movie_reviews LIMIT 1;",
        clg: "The table has records"
    },
    CheckIfMovieExists: {
        query: "SELECT 1 FROM movie_reviews WHERE movieName = ? LIMIT 1;",
        clg: "The movie exists"
    },
    Select: {
        query: "SELECT * FROM movie_reviews;",
        clg: "Rows selected"
    },
    Insert: {
        query: "Insert INTO movie_reviews (movieName, movieReview) VALUES (?,?);",
        clg: "Row inserted"
    },
    Delete: {
        query: "DELETE FROM movie_reviews WHERE movieName = ?;",
        clg: "Row deleted"
    },
    Update: {
        query: "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?;",
        clg: "Row updated"
    },
    Fill: {
        query: `INSERT INTO movie_reviews(movieName, movieReview) VALUES ${fillData};`,
        clg: "The table has been filled"
    }
    // CheckIfTableExists: {
    //     query: "SHOW TABLES LIKE 'movie_reviews';"
    // },
    // CheckIfDatabaseExists: {
    //     query: `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${conData.databaseName}';`
    // }
}