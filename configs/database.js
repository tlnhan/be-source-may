const mssql = require('mssql');
const dotenv = require('dotenv').config().parsed;

const mssqlConfig = {
    user: dotenv.MSSQL_USER,
    password: dotenv.MSSQL_PWD,
    server: dotenv.MSSQL_SV,
    database: dotenv.MSSQL_DB,
    trustServerCertificate: true,
    port: 4344
};

console.log(dotenv.MSSQL_USER)

module.exports = mssqlConfig;

mssql.connect(mssqlConfig, function (err) {
    if (err) console.log(err);
    else console.log("Database is connected.");
});