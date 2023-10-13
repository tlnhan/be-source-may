const express = require("express");
const router = express.Router();
const mssql = require("mssql");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("SELECT * FROM PhanCongSanXuat");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while getting assignment." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      NhanVien_Id,
      DonHang_L,
      ChiTiet_Id,
      SoLuong,
      DonGia,
      DonGiaBoSung,
      GhiChu,
      NgayTao,
      NguoiTao,
      NgayCapNhat,
      NguoiCapNhat,
    } = req.body;

    await mssql.query(
      `
            INSERT INTO PhanCongSanXuat (
                [NhanVien_Id],
                [DonHang_L],
                [ChiTiet_Id],
                [SoLuong],
                [DonGia],
                [DonGiaBoSung],
                [GhiChu],
                [NgayTao],
                [NguoiTao],
                [NgayCapNhat],
                [NguoiCapNhat],
            ) VALUES (
              '${NhanVien_Id}',
              N'${DonHang_L}',
              '${ChiTiet_Id}',
              '${SoLuong}',
              '${DonGia}',
              '${DonGiaBoSung}',
              '${GhiChu}',
              '${NgayTao}',
              N'${NguoiTao}',
              '${NgayCapNhat}',
              N'${NguoiCapNhat}'
            )
              `
    );
    res
      .status(200)
      .json({ message: "The assignment has been added successfully ." });
  } catch (error) {
    res.status(500).json({ error: "Error while adding assignment." });
  }
});

router.put("/:NhanVien_Id", async (req, res, next) => {
  try {
    const {
      NhanVien_Id,
      DonHang_L,
      ChiTiet_Id,
      SoLuong,
      DonGia,
      DonGiaBoSung,
      GhiChu,
      NgayTao,
      NguoiTao,
      NgayCapNhat,
      NguoiCapNhat,
    } = req.body;

    await mssql.query(
      `
                  UPDATE PhanCongSanXuat
                  SET DonHang_L = N'${DonHang_L}', 
                  ChiTiet_Id = '${ChiTiet_Id}', 
                  SoLuong = '${SoLuong}', 
                  DonGia = '${DonGia}', 
                  DonGiaBoSung = '${DonGiaBoSung}', 
                  GhiChu = '${GhiChu}', 
                  NgayTao = '${NgayTao}', 
                  NguoiTao = N'${NguoiTao}', 
                  NgayCapNhat = '${NgayCapNhat}', 
                  NguoiCapNhat = N'${NguoiCapNhat}'
                  WHERE NhanVien_Id = '${NhanVien_Id}'
              `
    );
    res.status(200).json({ message: "The assignment has been updated." });
  } catch (error) {
    res.status(500).json({ error: "Error while updating assignment." });
  }
});

router.delete("/:NhanVien_Id", async (req, res, next) => {
    try {
        const NhanVien_Id = req.body;
        await mssql.query(`DELETE FROM PhanCongSanXuat WHERE NhanVien_Id = ${NhanVien_Id}`);
        res.status(200).json({ message: "The assignment has been deleted." });
    } catch (error) {
        res.status(500).json({ error: 'Error while deleting assignment.' });
    }
});

module.exports = router;
