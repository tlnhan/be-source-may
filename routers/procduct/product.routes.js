const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("EXEC sp_DanhSachSanPham");

    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy danh sách sản phẩm." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      MaSP,
      TenSP,
      Tentat,
      GhiChu,
      LoaiSP_ID,
      DVT_ID,
      TamNgung,
      Create_User,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("MaSP", mssql.NVarChar(255), MaSP);
    request.input("TenSP", mssql.NVarChar(255), TenSP);
    request.input("Tentat", mssql.NVarChar(255), Tentat);
    request.input("GhiChu", mssql.NVarChar(255), GhiChu);
    request.input("LoaiSP_ID", mssql.Int, LoaiSP_ID);
    request.input("DVT_ID", mssql.Int, DVT_ID);
    request.input("TamNgung", mssql.Bit, TamNgung);
    request.input("Create_User", mssql.NVarChar(255), Create_User);

    await request.execute("sp_ThemSanPham");

    res.status(201).json({ message: "Thêm sản phẩm mới thành công." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi thêm sản phẩm mới." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const {
      SanPham_ID,
      MaSP,
      TenSP,
      Tentat,
      GhiChu,
      LoaiSP_ID,
      DVT_ID,
      TamNgung,
      Update_User,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("SanPham_ID", mssql.Int, SanPham_ID);
    request.input("MaSP", mssql.NVarChar(255), MaSP);
    request.input("TenSP", mssql.NVarChar(255), TenSP);
    request.input("Tentat", mssql.NVarChar(255), Tentat);
    request.input("GhiChu", mssql.NVarChar(255), GhiChu);
    request.input("LoaiSP_ID", mssql.Int, LoaiSP_ID);
    request.input("DVT_ID", mssql.Int, DVT_ID);
    request.input("TamNgung", mssql.Bit, TamNgung);
    request.input("Update_User", mssql.NVarChar(255), Update_User);

    await request.execute("sp_CapNhatSanPham");

    res.status(200).json({ message: "Cập nhật sản phẩm thành công." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi cập nhật sản phẩm." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { SanPham_ID } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("SanPham_ID", mssql.Int, SanPham_ID);

    await request.execute("sp_XoaSanPham");

    res.status(200).json({ message: "Xóa sản phẩm thành công." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi xóa sản phẩm." });
  }
});

module.exports = router;
