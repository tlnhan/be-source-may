const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const dotenv = require("dotenv").config().parsed;
const mssqlConfig = require("../../configs/database");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res, next) => {});

router.post("/", async (req, res, next) => {
  const { username, password } = req.body;

  await mssql
    .connect(mssqlConfig)
    .then((pool) => {
      const query = `SELECT * FROM TaiKhoan WHERE Username = @username AND Pass = @password`;
      return pool
        .request()
        .input("username", mssql.VarChar, username)
        .input("password", mssql.VarChar, password)
        .query(query);
    })
    .then((result) => {
      if (result.recordset.length > 0) {
        const { TaiKhoanID, VaiTro } = result.recordset[0];
        const token = jwt.sign(
          { username, password, VaiTro },
          dotenv.SECRET_KEY
        );
        res.status(200).json({ token, role: VaiTro });
      } else {
        res.status(400).json("Username or password is incorrect.");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("Server errors.");
    });
});

router.put("/", async (req, res, next) => {});

router.delete("/", async (req, res, next) => {});

module.exports = router;
