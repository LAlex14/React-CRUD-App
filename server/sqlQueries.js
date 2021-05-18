module.exports = {
    // CheckIfTableExists: "SHOW TABLES LIKE 'movie_reviews';",
    // CheckIfDatabaseExists: "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ",
    CheckifTableIsEmpty: "SELECT * FROM movie_reviews LIMIT 1;",
    CreateDatabase: "CREATE DATABASE IF NOT EXISTS ",
    UseDatabase: "USE ",
    CreateTable: "CREATE TABLE IF NOT EXISTS movie_reviews (`id` INT NOT NULL AUTO_INCREMENT, `movieName` VARCHAR(45) NOT NULL, `movieReview` TEXT(300) NOT NULL, PRIMARY KEY (`id`));",
    Select: "SELECT * FROM movie_reviews;",
    Insert: "Insert INTO movie_reviews (movieName, movieReview) VALUES (?,?);",
    Delete: "DELETE FROM movie_reviews WHERE movieName = ?;",
    Update: "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?;",
    Fill: "INSERT INTO movie_reviews(movieName, movieReview) VALUES ('Blade Runner 2049','Also like the first film (which, yes, you should see first), it’s visually rich and culturally intriguing. A worthy sequel. 8/10'),('Avengers: Infinity War', 'Despite the vast cast and multi-stranded plot that looks bewildering on paper, this does kind of work. 7/10'),('Baby Driver', 'Is beautifully choreographed and cut to the beat of the mostly 1960s and ’70s tracks. Above all, it’s fun. 8/10'),('Mission: Impossible – Fallout', 'If this does turn out to be Tom Cruise’s swansong in the lead role, though, it wouldn’t be a bad way to finish. 8/10'),('Murder on the Orient Express', 'It’s pleasant enough family viewing. Especially if the more aged family members have lost this particular plot. 6/10'),('What We Did on Our Holiday', 'Otherwise, this is a pacy, witty film that creatively expands the storyworld while still keeping the fans happy. 8/10'),('Mad Max: Fury Road', 'In the spirit of the original film it has plenty of black humour, too, but don’t expect story twists or deep characterisation (Max: mad). 7/10'),('Monty Python Live', 'At over two hours long plus interval, it probably warrants a 4/10 rating, but for their undoubted influence on my own humour, I’ll give it 6/10.'),('Guardians of the Galaxy', 'It’s all very Star Wars and the characters aren’t quite as likeable as they’re supposed to be, but there are a few laughs and original visuals. 7/10'),('The Big Sick', 'Based on Nanjiani and Emily Gordon’s real life and written by them, this is a funny and touching story with an absolutely terrible title but a great cast. 8/10'),('Midnight Special', 'The result is a film that’s a bit like Close Encounters of the Third Kind but without the humour, tension or any kind of deeper message. 5/10');"
}
