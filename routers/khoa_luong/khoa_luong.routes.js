const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database");

router.get("/", async (req, res, next) => {
  try {
    const pool = await mssql.connect(mssqlConfig);
    const result = await pool.request().execute("sp_HienThiNhanVienTheoTrangThaiSanLuong");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi lấy thông tin Nhân Viên theo trạng thái sản lượng." });
  }
});

module.exports = router;