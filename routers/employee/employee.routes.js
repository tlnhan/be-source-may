const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("EXEC sp_LayDanhSachNhanVien");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách khách hàng." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      MaNV,
      BoPhanID,
      ChucVuID,
      HoTen,
      NgaySinh,
      Email,
      SoDT,
      NgayVaoLam,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("MaNV", mssql.NVarChar, MaNV);
    request.input("BoPhanID", mssql.Int, BoPhanID);
    request.input("ChucVuID", mssql.Int, ChucVuID);
    request.input("HoTen", mssql.NVarChar, HoTen);
    request.input("NgaySinh", mssql.Date, NgaySinh);
    request.input("Email", mssql.NVarChar, Email);
    request.input("SoDT", mssql.VarChar, SoDT);
    request.input("NgayVaoLam", mssql.Date, NgayVaoLam);

    await request.execute("sp_ThemNhanVien");

    res.status(200).json({ message: "Thông tin nhân viên đã được thêm." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi thêm thông tin nhân viên." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const {
      id,
      MaNV,
      BoPhanID,
      ChucVuID,
      HoTen,
      NgaySinh,
      Email,
      SoDT,
      NgayVaoLam,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("id", mssql.Int, id);
    request.input("MaNV", mssql.NVarChar, MaNV);
    request.input("BoPhanID", mssql.Int, BoPhanID);
    request.input("ChucVuID", mssql.Int, ChucVuID);
    request.input("HoTen", mssql.NVarChar, HoTen);
    request.input("NgaySinh", mssql.Date, NgaySinh);
    request.input("Email", mssql.NVarChar, Email);
    request.input("SoDT", mssql.VarChar, SoDT);
    request.input("NgayVaoLam", mssql.Date, NgayVaoLam);

    await request.execute("sp_CapNhatNhanVien");

    res
      .status(200)
      .json({ message: "Cập nhật thông tin nhân viên thành công." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi cập nhật thông tin nhân viên." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { id } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("id", mssql.Int, id);

    await request.execute("sp_XoaKhachHang");

    res
      .status(200)
      .json({ message: "Xóa khách thông tin nhân viên thành công." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi xóa thông tin nhân viên." });
  }
});

module.exports = router;
