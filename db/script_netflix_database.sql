CREATE DATABASE netflix;

USE netflix;

CREATE TABLE movies(
	idMovie INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(45) NOT NULL,
    genre VARCHAR(45) NOT NULL,
    image VARCHAR(1000) NOT NULL,
    category VARCHAR(45) NOT NULL,
    year INT
);

CREATE TABLE users(
	idUser INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    user VARCHAR(45) NOT NULL UNIQUE,
    password VARCHAR(45) NOT NULL,
    name VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    plan_details VARCHAR(45) NOT NULL
);

CREATE TABLE actors(
	idActor INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    lastname VARCHAR(45) NOT NULL,
    country VARCHAR(45) NOT NULL,
    birthday DATE
);

INSERT INTO movies (title, genre, image, category, year)
VALUES 
	('Pulp fiction', 'crimen', 'https://pics.filmaffinity.com/pulp_fiction-210382116-large.jpg', 'top 10', 1994),
    ('La vita è bella', 'comedia', 'https://pics.filmaffinity.com/la_vita_e_bella-646167341-mmed.jpg', 'top 10', 1996),
    ('Forrest Gump', 'comedia', 'https://pics.filmaffinity.com/forrest_gump-212765827-mmed.jpg', 'top 10', 1994);

INSERT INTO users (user, password, name, email, plan_details)
VALUES 
	('laura_dev', 'laura', 'Laura', 'laura@gmail.com', 'Standard'),
	('maria_dev', 'maria', 'Maria', 'maria@gmail.com', 'Standard'),
    ('ester_dev', 'ester', 'Ester', 'ester@gmail.com', 'Standard');
    
INSERT INTO actors (name, lastname, country, birthday)
VALUES 
	('Tom', 'Hanks', 'EEUU', '1956-07-09'),
    ('Roberto', 'Benigni', 'Italia', '1952-10-27'),
    ('John', 'Travolta', 'EEUU', '1954-02-18');
    
SELECT * FROM movies;

SELECT title, genre FROM movies WHERE year > 1990;

SELECT * FROM movies WHERE category = 'Top 10';

UPDATE movies SET year = 1997 WHERE idMovie =2;

SELECT * FROM movies;

SELECT * FROM actors;

SELECT * FROM actors WHERE birthday BETWEEN '1950-01-01' and '1960-12-31';

SELECT name, lastname FROM actors WHERE country = 'EEUU';

SELECT * FROM users WHERE plan_details = 'Standard';

DELETE FROM users WHERE user LIKE 'm%';

SELECT * FROM users;

ALTER TABLE actors ADD image VARCHAR(200);

UPDATE actors SET image='https://upload.wikimedia.org/wikipedia/commons/e/e7/Tom_Hanks_at_the_Elvis_Premiere_2022.jpg' WHERE idActor=1;

UPDATE actors SET image='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Roberto_Benigni-5274.jpg/640px-Roberto_Benigni-5274.jpg' WHERE idActor=2;

UPDATE actors SET image='https://upload.wikimedia.org/wikipedia/commons/4/4f/John_Travolta_Cannes_2018.jpg' WHERE idActor=3;

DELETE FROM users;