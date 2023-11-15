const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("EXEC sp_LayDanhSachBoPhan");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách bộ phận." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { NguoiQuanLy, TenBP, SoDT } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("NguoiQuanLy", mssql.NVarChar, NguoiQuanLy);
    request.input("TenBP", mssql.NVarChar, TenBP);
    request.input("SoDT", mssql.VarChar, SoDT);

    await request.execute("sp_ThemBoPhan");

    res.status(200).json({ message: "Bộ phận đã được thêm." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi thêm bộ phận." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { BoPhanID, NguoiQuanLy, TenBP, SoDT } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("BoPhanID", mssql.Int, BoPhanID);
    request.input("NguoiQuanLy", mssql.NVarChar, NguoiQuanLy);
    request.input("TenBP", mssql.NVarChar, TenBP);
    request.input("SoDT", mssql.VarChar, SoDT);

    await request.execute("sp_CapNhatBoPhan");

    res.status(200).json({ message: "Cập nhật bộ phận thành công." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi cập nhật bộ phận." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { BoPhanID } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("BoPhanID", mssql.Int, BoPhanID);

    await request.execute("sp_XoaChucVu");

    res.status(200).json({ message: "Xóa khách bộ phận thành công." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi xóa bộ phận." });
  }
});

module.exports = router;
