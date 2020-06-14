CREATE DATABASE budget;

USE budget;

CREATE TABLE transactions (
_id INTEGER AUTO_INCREMENT PRIMARY KEY,
userId INTEGER,
year INTEGER,
month INTEGER,
day INTEGER,
category VARCHAR(20),
amount FLOAT,
description varchar(200),
note text
);

CREATE TABLE pools (
_id INTEGER AUTO_INCREMENT PRIMARY KEY,
userId INTEGER,
pool VARCHAR(7),
year INTEGER,
category VARCHAR(20),
target FLOAT
);