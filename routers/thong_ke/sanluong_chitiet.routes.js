const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database");

router.get("/", async (req, res, next) => {
  try {
    const { TuNgay, DenNgay } = req.query;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("TuNgay", mssql.Date, TuNgay);
    request.input("DenNgay", mssql.Date, DenNgay);

    const result = await request.execute("sp_ThongKeSanLuongChiTiet");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi lấy thông tin thống kê sản lượng chi tiết." });
  }
});

module.exports = router;
