const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database");

router.get("/", async (req, res) => {
  try {
    const result = await mssql.query("EXEC sp_LayDanhSachKhachHang");

    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy danh sách khách hàng." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      TenKhachHang,
      Tentat,
      DiaChi,
      SoDT,
      Fax,
      Masothue,
      NguoiDaiDien,
      NguoiLH,
      ThongTinLH,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("TenKhachHang", mssql.NVarChar, TenKhachHang);
    request.input("Tentat", mssql.NVarChar, Tentat);
    request.input("DiaChi", mssql.NVarChar, DiaChi);
    request.input("SoDT", mssql.VarChar, SoDT);
    request.input("Fax", mssql.VarChar, Fax);
    request.input("Masothue", mssql.VarChar, Masothue);
    request.input("NguoiDaiDien", mssql.NVarChar, NguoiDaiDien);
    request.input("NguoiLH", mssql.NVarChar, NguoiLH);
    request.input("ThongTinLH", mssql.NVarChar, ThongTinLH);

    await request.execute("sp_ThemKhachHang");

    res.status(201).json({ message: "Thêm thông tin khách hàng thành công." });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi thêm thông tin khách hàng." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const {
      MaKhachHang,
      TenKhachHang,
      Tentat,
      DiaChi,
      SoDT,
      Fax,
      Masothue,
      NguoiDaiDien,
      NguoiLH,
      ThongTinLH,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("MaKhachHang", mssql.VarChar, MaKhachHang);
    request.input("TenKhachHang", mssql.NVarChar, TenKhachHang);
    request.input("Tentat", mssql.NVarChar, Tentat);
    request.input("DiaChi", mssql.NVarChar, DiaChi);
    request.input("SoDT", mssql.VarChar, SoDT);
    request.input("Fax", mssql.VarChar, Fax);
    request.input("Masothue", mssql.VarChar, Masothue);
    request.input("NguoiDaiDien", mssql.NVarChar, NguoiDaiDien);
    request.input("NguoiLH", mssql.NVarChar, NguoiLH);
    request.input("ThongTinLH", mssql.NVarChar, ThongTinLH);

    await request.execute("sp_CapNhatKhachHang");

    res
      .status(200)
      .json({ message: "Cập nhật thông tin khách hàng thành công." });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi cập nhật thông tin khách hàng." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { MaKhachHang } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("MaKhachHang", mssql.VarChar, MaKhachHang);

    await request.execute("sp_XoaKhachHang");

    res.status(200).json({ message: "Xóa khách hàng thành công." });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi xóa khách hàng." });
  }
});

module.exports = router;
