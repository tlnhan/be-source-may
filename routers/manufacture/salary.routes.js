const express = require("express");
const router = express.Router();
const mssql = require("mssql");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("SELECT * FROM BangLuongSanPham");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while getting salary." });
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
      NgayTao,
    } = req.body;

    const result = await mssql.query(
      `
                INSERT INTO BangLuongSanPham (
                    [Thang]
                    [Nam],
                    [NhanVien_ID],
                    [DonHang_L],
                    [ChiTiet_Id],
                    [SoLuong],
                    [DonGia],
                    [DonGiaBoSung],
                    [GhiChu],
                    [NgayTongHop],
                    [ThoiGianTongHop],
                    [NguoiTao],
                    [NgayTao]
                ) VALUES (
                  '${Thang}',
                  '${Nam}',
                  '${NhanVien_ID}',
                  '${DonHang_L}',
                  '${ChiTiet_Id}',
                  '${SoLuong}',
                  '${DonGia}',
                  '${DonGiaBoSung}',
                  '${GhiChu}',
                  '${NgayTongHop}',
                  '${ThoiGianTongHop}',
                  N'${NguoiTao}',
                  '${NgayTao}'
                )
                  `
    );
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while adding salary." });
  }
});

router.put("/", async (req, res, next) => {
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
      NgayTao,
    } = req.body;

    const result = await mssql.query(
      `
                      UPDATE BangLuongSanPham
                      SET Thang = '${Thang}', 
                      Nam = '${Nam}', 
                      DonHang_L = '${DonHang_L}', 
                      ChiTiet_Id = '${ChiTiet_Id}', 
                      SoLuong = '${SoLuong}', 
                      DonGia = '${DonGia}', 
                      DonGiaBoSung = '${DonGiaBoSung}', 
                      GhiChu = '${GhiChu}', 
                      NgayTongHop = '${NgayTongHop}'
                      ThoiGianTongHop = '${ThoiGianTongHop}',
                      NguoiTao = N'${NguoiTao}',
                      NgayTao = '${NgayTao}'
                      WHERE NhanVien_ID = '${NhanVien_ID}'
                  `
    );
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while updating salary." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { NhanVien_ID } = req.body;
    await mssql.query(
      `DELETE FROM BangLuongSanPham WHERE NhanVien_ID = '${NhanVien_ID}'`
    );
    res.status(200).json({
      message: `The salary with NhanVien_ID: "${NhanVien_ID}" has been deleted.`,
    });
  } catch (error) {
    res.status(500).json({ error: "Error while deleting salary." });
  }
});

module.exports = router;
