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

CREATE TABLE networth (
_id INTEGER AUTO_INCREMENT PRIMARY KEY,
userId INTEGER,
year INTEGER,
month INTEGER,
day INTEGER,
accountInstitution VARCHAR(40),
accountName VARCHAR(40),
accountBalance FLOAT,
isAsset BOOLEAN,
isRetirement BOOLEAN,
isInvestment BOOLEAN,
isHome BOOLEAN
);