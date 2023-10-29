const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("EXEC sp_DSMau");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách màu." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { MaMau, TenMau, MS, NguoiTao } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("MaMau", mssql.NVarChar(50), MaMau);
    request.input("TenMau", mssql.NVarChar(255), TenMau);
    request.input("MS", mssql.FLOAT, MS);
    request.input("NguoiTao", mssql.NVarChar(50), NguoiTao);

    await request.execute("sp_ThemMau");

    res.status(201).json({ message: "Thêm màu mới thành công." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi thêm màu mới." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { MauSP_Id, MaMau, TenMau, MS, NguoiTao } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("MauSP_Id", mssql.Int, MauSP_Id);
    request.input("MaMau", mssql.NVarChar(50), MaMau);
    request.input("MaMau", mssql.NVarChar(50), MaMau);
    request.input("TenMau", mssql.NVarChar(255), TenMau);
    request.input("MS", mssql.FLOAT, MS);
    request.input("NguoiTao", mssql.NVarChar(50), NguoiTao);

    await request.execute("sp_CapNhatMau");

    res.status(201).json({ message: "Cập nhật màu thành công." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi cập nhật màu." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { MauSP_Id } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("MauSP_Id", mssql.Int, MauSP_Id);

    await request.execute("sp_XoaMau");

    res.status(200).json({ message: "Xóa màu thành công." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi xóa màu." });
  }
});

module.exports = router;
