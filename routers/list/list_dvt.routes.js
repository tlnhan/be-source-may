const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("EXEC sp_LayDanhSachDVT");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách đơn vị tính." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      MaDVT,
      TenDVT,
      VietTat,
      GhiChu,
      TamNgung,
      Create_User,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("MaDVT", mssql.VarChar(15), MaDVT);
    request.input("TenDVT", mssql.NVarChar(150), TenDVT);
    request.input("VietTat", mssql.NVarChar(50), VietTat);
    request.input("GhiChu", mssql.NVarChar(150), GhiChu);
    request.input("TamNgung", mssql.Bit, TamNgung);
    request.input("Create_User", mssql.NVarChar(50), Create_User);

    await request.execute("sp_ThemDVT");

    res.status(200).json({ message: "Đơn vị tính đã được thêm." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi thêm đơn vị tính." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const {
      DVT_ID,
      MaDVT,
      TenDVT,
      VietTat,
      GhiChu,
      TamNgung,
      Update_User,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);
    
    request.input("DVT_ID", mssql.Int, DVT_ID);
    request.input("MaDVT", mssql.VarChar(15), MaDVT);
    request.input("TenDVT", mssql.NVarChar(150), TenDVT);
    request.input("VietTat", mssql.NVarChar(50), VietTat);
    request.input("GhiChu", mssql.NVarChar(150), GhiChu);
    request.input("TamNgung", mssql.Bit, TamNgung);
    request.input("Update_User", mssql.NVarChar(50), Update_User);

    await request.execute("sp_CapNhatDVT");

    res.status(200).json({ message: "Đơn vị tính đã được cập nhật." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi cập nhật đơn vị tính." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { DVT_ID } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("DVT_ID", mssql.Int, DVT_ID);

    await request.execute("sp_XoaDVT ");

    res.status(200).json({ message: "Xóa đơn vị tính thành công." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi xóa đơn vị tính." });
  }
});

module.exports = router;
