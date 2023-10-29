const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("EXEC sp_DSLoai");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách loại sản phẩm." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { Ma, Ten, Tentat, GhiChu, ChungLoai_Id, NguoiTao } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("Ma", mssql.NVarChar(15), Ma);
    request.input("Ten", mssql.NVarChar(150), Ten);
    request.input("Tentat", mssql.NVarChar(50), Tentat);
    request.input("GhiChu", mssql.NVarChar(150), GhiChu);
    request.input("ChungLoai_Id", mssql.Int, ChungLoai_Id);
    request.input("NguoiTao", mssql.NVarChar(50), NguoiTao);

    await request.execute("sp_ThemLoai");

    res.status(201).json({ message: "Thêm loại sản phẩm mới thành công." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi thêm loại sản phẩm mới." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const {
      Loai_ID,
      Ma,
      Ten,
      TenTat,
      GhiChu,
      ChungLoai_Id,
      NguoiCapNhat,
      TamNgung,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("Loai_Id", mssql.Int, Loai_ID);
    request.input("Ma", mssql.NVarChar(15), Ma);
    request.input("Ten", mssql.NVarChar(150), Ten);
    request.input("TenTat", mssql.NVarChar(50), TenTat);
    request.input("GhiChu", mssql.NVarChar(150), GhiChu);
    request.input("ChungLoai_Id", mssql.Int, ChungLoai_Id);
    request.input("NguoiCapNhat", mssql.NVarChar(50), NguoiCapNhat);
    request.input("TamNgung", mssql.Bit, TamNgung);

    await request.execute("sp_CapNhatLoai");

    res.status(200).json({ message: "Cập nhật loại sản phẩm thành công." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi cập nhật loại sản phẩm." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { Loai_ID } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("Loai_Id", mssql.Int, Loai_ID);

    await request.execute("sp_XoaLoai");

    res.status(200).json({ message: "Xóa loại sản phẩm thành công." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi xóa loại sản phẩm." });
  }
});

module.exports = router;
