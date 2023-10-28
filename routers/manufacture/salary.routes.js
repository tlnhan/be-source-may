const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("EXEC sp_LayDanhSachBangLuongSanPham");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Lỗi khi lấy danh sách bảng lương sản phẩm." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      Thang,
      Nam,
      NhanVien_ID,
      DonHang_L,
      ChiTiet_Id,
      SoLuong,
      DonGia,
      DonGiaBoSung,
      GhiChu,
      NgayTongHop,
      ThoiGianTongHop,
      NguoiTao,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("Thang", mssql.TinyInt, Thang);
    request.input("Nam", mssql.SmallInt, Nam);
    request.input("NhanVien_ID", mssql.Int, NhanVien_ID);
    request.input("DonHang_L", mssql.Int, DonHang_L);
    request.input("ChiTiet_Id", mssql.Int, ChiTiet_Id);
    request.input("SoLuong", mssql.Int, SoLuong);
    request.input("DonGia", mssql.Float, DonGia);
    request.input("DonGiaBoSung", mssql.Float, DonGiaBoSung);
    request.input("GhiChu", mssql.NVarChar(250), GhiChu);
    request.input("NgayTongHop", mssql.SmallDateTime, NgayTongHop);
    request.input("ThoiGianTongHop", mssql.SmallDateTime, ThoiGianTongHop);
    request.input("NguoiTao", mssql.Int, NguoiTao);

    await request.execute("sp_ThemBangLuongSanPham");

    res.status(200).json({ message: "Bảng lương sản phẩm đã được thêm." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi thêm bảng lương sản phẩm." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const {
      Luong_ID,
      Thang,
      Nam,
      NhanVien_ID,
      DonHang_L,
      ChiTiet_Id,
      SoLuong,
      DonGia,
      DonGiaBoSung,
      GhiChu,
      NgayTongHop,
      ThoiGianTongHop,
      NguoiTao,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("Luong_ID", mssql.Int, Luong_ID);
    request.input("Thang", mssql.TinyInt, Thang);
    request.input("Nam", mssql.SmallInt, Nam);
    request.input("NhanVien_ID", mssql.Int, NhanVien_ID);
    request.input("DonHang_L", mssql.Int, DonHang_L);
    request.input("ChiTiet_Id", mssql.Int, ChiTiet_Id);
    request.input("SoLuong", mssql.Int, SoLuong);
    request.input("DonGia", mssql.Float, DonGia);
    request.input("DonGiaBoSung", mssql.Float, DonGiaBoSung);
    request.input("GhiChu", mssql.NVarChar(250), GhiChu);
    request.input("NgayTongHop", mssql.SmallDateTime, NgayTongHop);
    request.input("ThoiGianTongHop", mssql.SmallDateTime, ThoiGianTongHop);
    request.input("NguoiTao", mssql.Int, NguoiTao);

    await request.execute("sp_CapNhatBangLuongSanPham");

    res.status(200).json({ message: "Bảng lương sản phẩm đã được cập nhật." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi cập nhật bảng lương sản phẩm." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { Luong_ID } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("Luong_ID", mssql.Int, Luong_ID);

    await request.execute("sp_XoaBangLuongSanPham ");

    res.status(200).json({ message: "Xóa bảng lương sản phẩm thành công." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi xóa bảng lương sản phẩm." });
  }
});

module.exports = router;
