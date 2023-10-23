const express = require("express");
const router = express.Router();
const mssql = require("mssql");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("SELECT * FROM DonHang_L");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while getting order-L." });
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

    const result = await mssql.query(
      `
                INSERT INTO DonHang_H (
                    [DonHang_H],
                    [SanPham_Id],
                    [MauSP_Id],
                    [Size_Id],
                    [SoLuong],
                    [NgayYCGH],
                    [GhiChu]
                ) VALUES (
                  '${DonHang_H}',
                  '${SanPham_Id}',
                  '${MauSP_Id}',
                  '${Size_Id}',
                  '${SoLuong}',
                  '${NgayYCGH}',
                  N'${GhiChu}'
                )
                  `
    );
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while adding order-L." });
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

    const result = await mssql.query(
      `
                      UPDATE DonHang_L
                      SET DonHang_H = '${DonHang_H}',
                      SanPham_Id = '${SanPham_Id}', 
                      MauSP_Id = '${MauSP_Id}', 
                      Size_Id = '${Size_Id}', 
                      SoLuong = '${SoLuong}', 
                      NgayYCGH = '${NgayYCGH}', 
                      GhiChu = N'${GhiChu}'
                      WHERE DonHang_L = '${DonHang_L}'
                  `
    );
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while updating order-L." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { DonHang_L } = req.body;
    await mssql.query(`DELETE FROM DonHang_H WHERE DonHang_L = '${DonHang_L}'`);
    res.status(200).json({
      message: `The order-L with DonHang_L: ${DonHang_L} has been deleted.`,
    });
  } catch (error) {
    res.status(500).json({ error: "Error while deleting order-L." });
  }
});

module.exports = router;
