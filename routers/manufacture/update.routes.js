const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("EXEC sp_LayDanhSachCapNhatSanLuong");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Lỗi khi lấy danh sách cập nhật sản lượng." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      PhanCong_Id,
      NgaySanLuong,
      ThoiGianSanLuong,
      SoLuong,
      KhoaSanLuong,
      NgayKhoaSanLuong,
      NguoiKhoaSanLuong,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("PhanCong_Id", mssql.NChar(10), PhanCong_Id);
    request.input("NgaySanLuong", mssql.Date, NgaySanLuong);
    request.input("ThoiGianSanLuong", mssql.SmallDateTime, ThoiGianSanLuong);
    request.input("SoLuong", mssql.Int, SoLuong);
    request.input("KhoaSanLuong", mssql.Bit, KhoaSanLuong);
    request.input("NgayKhoaSanLuong", mssql.SmallDateTime, NgayKhoaSanLuong);
    request.input("NguoiKhoaSanLuong", mssql.Int, NguoiKhoaSanLuong);

    await request.execute("sp_ThemCapNhatSanLuong");

    res.status(200).json({ message: "thêm cập nhật sản lượng thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi thêm cập nhật sản lượng" });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const {
      SanLuong_Id,
      PhanCong_Id,
      NgaySanLuong,
      ThoiGianSanLuong,
      SoLuong,
      KhoaSanLuong,
      NgayKhoaSanLuong,
      NguoiKhoaSanLuong,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("SanLuong_Id", mssql.BigInt, SanLuong_Id);
    request.input("PhanCong_Id", mssql.NChar(10), PhanCong_Id);
    request.input("NgaySanLuong", mssql.Date, NgaySanLuong);
    request.input("ThoiGianSanLuong", mssql.SmallDateTime, ThoiGianSanLuong);
    request.input("SoLuong", mssql.Int, SoLuong);
    request.input("KhoaSanLuong", mssql.Bit, KhoaSanLuong);
    request.input("NgayKhoaSanLuong", mssql.SmallDateTime, NgayKhoaSanLuong);
    request.input("NguoiKhoaSanLuong", mssql.Int, NguoiKhoaSanLuong);

    await request.execute("sp_CapNhatCapNhatSanLuong");

    res.status(200).json({ message: "Cập nhật cập nhật sản lượng thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi cập nhật cập nhật sản lượng" });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { SanLuong_Id } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("SanLuong_Id", mssql.BigInt, SanLuong_Id);

    await request.execute("sp_XoaCapNhatSanLuong ");

    res.status(200).json({ message: "Xóa cập nhật sản lượng thành công." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi xóa cập nhật sản lượng." });
  }
});

module.exports = router;
