const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database");

router.post("/", async (req, res, next) => {
  try {
    const { Action, MauSP_Id, MaMau, TenMau, MS, NguoiTao, checkvalue } =
      req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("Action", mssql.NVarChar(50), Action);
    request.input("MauSP_Id", mssql.Int, MauSP_Id);
    request.input("MaMau", mssql.NVarChar(50), MaMau);
    request.input("TenMau", mssql.NVarChar(255), TenMau);
    request.input("MS", mssql.Float, MS);
    request.input("NguoiTao", mssql.Int, NguoiTao);
    request.input("checkvalue", mssql.Int, checkvalue);

    await request.execute("sp_DSMau");

    res.status(201).json({ message: "asdas" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi thêm màu mới." });
  }
});

module.exports = router;
