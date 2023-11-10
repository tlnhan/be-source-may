const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("EXEC sp_LayDanhSachDonHang_L");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy danh sách đơn hàng L." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      DonHang_H,
      SanPham_Id,
      MauSP_Id,
      Size_Id,
      SoLuong,
      NgayYCGH,
      GhiChu,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("DonHang_H", mssql.Int, DonHang_H);
    request.input("SanPham_Id", mssql.Int, SanPham_Id);
    request.input("MauSP_Id", mssql.Int, MauSP_Id);
    request.input("Size_Id", mssql.Int, Size_Id);
    request.input("SoLuong", mssql.Int, SoLuong);
    request.input("NgayYCGH", mssql.VarChar(10), NgayYCGH);
    request.input("GhiChu", mssql.NVarChar(200), GhiChu);

    await request.query("EXEC sp_ThemDonHang_L");

    res.status(200).json({ message: "Đã thêm đơn hàng L mới." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi thêm đơn hàng L." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const {
      DonHang_L,
      DonHang_H,
      SanPham_Id,
      MauSP_Id,
      Size_Id,
      SoLuong,
      NgayYCGH,
      GhiChu,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("DonHang_L", mssql.Int, DonHang_L);
    request.input("DonHang_H", mssql.Int, DonHang_H);
    request.input("SanPham_Id", mssql.Int, SanPham_Id);
    request.input("MauSP_Id", mssql.Int, MauSP_Id);
    request.input("Size_Id", mssql.Int, Size_Id);
    request.input("SoLuong", mssql.Int, SoLuong);
    request.input("NgayYCGH", mssql.VarChar(10), NgayYCGH);
    request.input("GhiChu", mssql.NVarChar(200), GhiChu);

    await request.query("EXEC sp_CapNhatDonHang_L");

    res.status(200).json({ message: "Đã cập nhật đơn hàng L." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi cập nhật đơn hàng L." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { DonHang_L } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("DonHang_L", mssql.Int, DonHang_L);

    await request.execute("sp_XoaBangLuongSanPham ");

    res.status(200).json({ message: "Xóa bảng lượng sản phẩm thành công." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi xóa đơn hàng L." });
  }
});

module.exports = router;
