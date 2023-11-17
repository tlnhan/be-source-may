const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database");

router.post("/", async (req, res, next) => {
  try {
      const { NhanVien_ID, Thang, Nam } = req.body;

      const pool = await mssql.connect(mssqlConfig);
      const request = new mssql.Request(pool);

      request.input("NhanVien_ID", mssql.Int, NhanVien_ID);
      request.input("Thang", mssql.TinyInt, Thang);
      request.input("Nam", mssql.SmallInt, Nam);
      request.output("Luong", mssql.Float);

      await request.execute("sp_TinhLuongNhanVien");

      const result = request.parameters.Luong.value;

      res.status(200).json({ Luong: result });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Lỗi khi tính lương cho nhân viên." });
  }
});
module.exports = router;
