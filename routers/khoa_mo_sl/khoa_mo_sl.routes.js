const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database");

router.post("/", async (req, res, next) => {
  try {
    const { Action, NgaySanLuong, NhanVien_ID, UserID } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("Action", mssql.NVarChar(50), Action);
    request.input("NgaySanLuong", mssql.Date, NgaySanLuong);
    request.input("NhanVien_ID", mssql.Int, NhanVien_ID);
    request.input("UserID", mssql.Int, UserID);

    await request.execute("sp_KhoaMoSanLuong");

    res.status(200).json({ message: "Thao tác sản lượng thành công." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Thao tác sản lượng thất bại." });
  }
});

module.exports = router;
