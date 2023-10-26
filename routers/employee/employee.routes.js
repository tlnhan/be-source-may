const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("EXEC sp_LayDanhSachNhanVien");

    res.status(200).json(result.recordset);
  } catch (error) {
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

    res.status(201).json({ message: "Thêm thông tin nhân viên thành công." });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi thêm thông tin nhân viên." });
  }
});

router.put("/", async (req, res, next) => {
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
      NgayCapNhat,
    } = req.body;

    const result = await mssql.query(
      `
                UPDATE NhanVien
                SET BoPhanID = '${BoPhanID}', 
                ChucVuID = '${ChucVuID}', 
                HoTen = '${HoTen}', 
                NgaySinh = '${NgaySinh}', 
                Email = '${Email}', 
                SoDT = '${SoDT}', 
                NgayVaoLam = '${NgayVaoLam}', 
                NgayCapNhat = '${NgayCapNhat}' 
                WHERE MaNV = '${MaNV}'
            `
    );
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while updating employee." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { MaNV } = req.body;
    await mssql.query(`DELETE FROM NhanVien WHERE MaNV = '${MaNV}'`);
    res
      .status(200)
      .json({ message: `The employee with MaNV: '${MaNV}' has been deleted.` });
  } catch (error) {
    res.status(500).json({ error: "Error while deleting employee." });
  }
});

module.exports = router;
