const mssql = require('mssql');
require("dotenv").config().parsed;

const mssqlConfig = {
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PWD,
    server: process.env.MSSQL_SV,
    database: process.env.MSSQL_DB,
    trustServerCertificate: true,
    port: 4344
};

module.exports = mssqlConfig;

mssql.connect(mssqlConfig, function (err) {
    if (err) console.log(err);
    else console.log("Database is connected.");
});