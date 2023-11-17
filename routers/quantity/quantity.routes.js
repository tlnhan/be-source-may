const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database");

router.get("/", async (req, res, next) => {
  try {
    const pool = await mssql.connect(mssqlConfig);
    const result = await pool.request().execute("sp_DSTongHopSanLuong");
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while getting the list." });
  }
});

module.exports = router;
