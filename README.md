# Ravitsemusterapeuttipalvelun back-end

## Getting Started

### Ennen asennusta

Asenna tarvittaessa:

Node.js
Database: Postgres, MySQL, MariaDB, SQLite tai Microsoft SQL Server

#### Tietokanta

luo kannat palvelulle ja testaukselle
esim:
```
CREATE DATABASE database;
CREATE DATABASE test_database;
```

luo käyttäjä / käyttäjät kannoille, anna kaikki oikeudet
esim:
```
create user 'db_user'@'localhost' IDENTIFIED with mysql_native_password by 'pwd';
grant all on database.* to 'db_user'@'localhost'; 

create user 'test_db_user'@'localhost' IDENTIFIED with mysql_native_password by 'pwd';
grant all on test_database.* to 'test_db_user'@'localhost'; 
```

#### Luo .env-filu

Tee .env-filu, jotta sovellus saa tarvittavat tiedot (ks. malli .env.example)

### Asentaminen

#### Tuotanto

```
npm install
npm run install
    -> ajaa databasen migraatiot ja tarvittavat seedit
```

#### Devaus

```
npm install
npm run install-with-dummy
    -> ajaa databasen migraatiot ja tarvittavat seedit + luo dummy dataa
```

asennettavat modulet:

"devDependencies": {
    "faker": "^4.1.0",
    "nodemon": "^2.0.2"
},
"dependencies": {
    "bcrypt": "^4.0.1",
    "chai": "^4.2.0",
    "chai-http": "^4.3.0",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "mocha": "^7.0.1",
    "moment": "^2.24.0",
    "mysql2": "^2.1.0",
    "sequelize": "^5.21.4",
    "sequelize-cli": "^5.5.1"
},


### Testaaminen

```
npm run test
```
ajaa testin testaus environmentilla, eli käyttää testikantaa

```
npm run pre-test
```
ajaa testikannan migraatiot ja tarvittavat seedit

```
npm run post-test
```
ajaa testikannan taulut alas