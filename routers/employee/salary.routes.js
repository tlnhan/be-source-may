const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database");

router.get("/", async (req, res, next) => {
  try {
      const { Thang, Nam } = req.query; // Lấy tháng và năm từ query params

      const pool = await mssql.connect(mssqlConfig);
      const request = new mssql.Request(pool);

      request.input("Thang", mssql.TinyInt, Thang);
      request.input("Nam", mssql.SmallInt, Nam);
      request.output("Luong", mssql.Float);

      const result = await request.execute("sp_TinhLuongNhanVien");

      res.status(200).json(result.recordset);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Lỗi khi tính lương cho nhân viên." });
  }
});

module.exports = router;
