const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("EXEC sp_LayDanhSachChucVu");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách chức vụ." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { ChucVu } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("ChucVu", mssql.NVarChar, ChucVu);

    await request.execute("sp_ThemChucVu");

    res.status(200).json({ message: "Chức vụ đã được thêm." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi thêm chức vụ." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { id, ChucVu } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("id", mssql.Int, id);
    request.input("ChucVu", mssql.NVarChar, ChucVu);

    await request.execute("sp_CapNhatChucVu");

    res
      .status(200)
      .json({ message: "Cập nhật chức vụ thành công." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi cập nhật chức vụ." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { id } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("id", mssql.Int, id);

    await request.execute("sp_XoaChucVu");

    res
      .status(200)
      .json({ message: "Xóa khách chức vụ thành công." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi xóa chức vụ." });
  }
});

module.exports = router;
