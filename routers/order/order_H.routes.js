const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("SELECT * FROM DonHang_H");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while getting order-H." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      SoDH,
      KhachHang_ID,
      NguoiLap_ID,
      NgayLap,
      NgayYCGH,
      PhuongThucGH,
      GhiChu,
      NguoiTiepNhan,
      NgayTN,
      NgaySX,
      NgayBDGH,
      NgayKTGH,
      DienGiaiTN,
      NguoiTao,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("SoDH", mssql.VarChar, SoDH);
    request.input("KhachHang_ID", mssql.Int, KhachHang_ID);
    request.input("NguoiLap_ID", mssql.Int, NguoiLap_ID);
    request.input("NgayLap", mssql.SmallDateTime, NgayLap);
    request.input("NgayYCGH", mssql.SmallDateTime, NgayYCGH);
    request.input("PhuongThucGH", mssql.NVarChar, PhuongThucGH);
    request.input("GhiChu", mssql.NVarChar, GhiChu);
    request.input("NguoiTiepNhan", mssql.Int, NguoiTiepNhan);
    request.input("NgayTN", mssql.SmallDateTime, NgayTN);
    request.input("NgaySX", mssql.VarChar, NgaySX);
    request.input("NgayBDGH", mssql.VarChar, NgayBDGH);
    request.input("NgayKTGH", mssql.VarChar, NgayKTGH);
    request.input("DienGiaiTN", mssql.NVarChar, DienGiaiTN);
    request.input("NguoiTao", mssql.Int, NguoiTao);

    const result = await request.execute("sp_ThemDonHangH");

    if (result.returnValue === 0) {
      res.status(200).json({ message: "Đơn hàng H đã được thêm." });
    } else {
      res.status(500).json({ error: "Lỗi khi thêm đơn hàng H." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi máy chủ." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const {
      DonHang_H,
      SoDH,
      KhachHang_ID,
      NguoiLap_ID,
      NgayLap,
      NgayYCGH,
      PhuongThucGH,
      GhiChu,
      NguoiTiepNhan,
      NgayTN,
      NgaySX,
      NgayBDGH,
      NgayKTGH,
      DienGiaiTN,
      NguoiTao,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("DonHang_H", mssql.BigInt, DonHang_H);
    request.input("SoDH", mssql.VarChar, SoDH);
    request.input("KhachHang_ID", mssql.Int, KhachHang_ID);
    request.input("NguoiLap_ID", mssql.Int, NguoiLap_ID);
    request.input("NgayLap", mssql.SmallDateTime, NgayLap);
    request.input("NgayYCGH", mssql.SmallDateTime, NgayYCGH);
    request.input("PhuongThucGH", mssql.NVarChar, PhuongThucGH);
    request.input("GhiChu", mssql.NVarChar, GhiChu);
    request.input("NguoiTiepNhan", mssql.Int, NguoiTiepNhan);
    request.input("NgayTN", mssql.SmallDateTime, NgayTN);
    request.input("NgaySX", mssql.VarChar, NgaySX);
    request.input("NgayBDGH", mssql.VarChar, NgayBDGH);
    request.input("NgayKTGH", mssql.VarChar, NgayKTGH);
    request.input("DienGiaiTN", mssql.NVarChar, DienGiaiTN);
    request.input("NguoiTao", mssql.Int, NguoiTao);

    const result = await request.execute("sp_CapNhatDonHangH");

    if (result.returnValue === 0) {
      res.status(200).json({ message: "Đơn hàng H đã được cập nhật." });
    } else {
      res.status(500).json({ error: "Lỗi khi cập nhật đơn hàng H." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi máy chủ." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { DonHang_H } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("DonHang_H", mssql.BigInt, DonHang_H);

    await request.execute("sp_XoaDonHangH ");

    res.status(200).json({ message: "Xóa phân đơn hàng H thành công." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi xóa đơn hàng H." });
  }
});

module.exports = router;
