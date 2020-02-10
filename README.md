# Ravitsemusterapeuttipalvelun back-end

## Getting Started

### Ennen asennusta

Asenna tarvittaessa:

Node.js
Database: Postgres, MySQL, MariaDB, SQLite tai Microsoft SQL Server

### Asentaminen

```
npm install
```

asennettavat modulet:

"devDependencies": {
    "faker": "^4.1.0",
    "nodemon": "^2.0.2"
},
"dependencies": {
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "mocha": "^7.0.1",
    "mysql2": "^2.1.0",
    "sequelize": "^5.21.3",
    "sequelize-cli": "^5.5.1"
}

#### Luo .env-filu

Tee .env-filu, jotta sovellus saa tarvittavat tiedot (ks. malli .env.example)

#### Tietokanta

Luo ensin database miten ikinä haluatkaan, sen jälkeen aja migraatiot:
```
npx sequelize db:migrate
```

testausvaiheessa voi ajaa db:n seedauksen (luo feikkidataa):
```
npx sequelize db:seed:all
```

feikkidatan saa pois:
```
npx sequelize db:seed:undo:all
```

ja taulut saa poistettua 
```
db:migrate:undo:all
```
