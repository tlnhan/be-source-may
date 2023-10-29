const express = require("express");
const router = express.Router();
const mssql = require("mssql");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("SELECT * FROM SanPham_Mau");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while getting color-product." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      SanPham_Id,
      MauSP_Id,
      GhiChu,
      NgayTao,
      NguoiTao,
      NgayCapNhat,
      NguoiCapNhat,
    } = req.body;

    const result = await mssql.query(
      `
                    INSERT INTO SanPham_Mau (
                        [SanPham_Id],
                        [MauSP_Id],
                        [GhiChu],
                        [NgayTao],
                        [NguoiTao],
                        [NgayCapNhat],
                        [NguoiCapNhat]
                    ) VALUES (
                      '${SanPham_Id}',
                      '${MauSP_Id}',
                      '${GhiChu}',
                      N'${NgayTao}',
                      '${NguoiTao}',
                      '${NgayCapNhat}',
                      N'${NguoiCapNhat}'
                    )
                      `
    );
    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while adding color-product." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { MauSP_Id, GhiChu, NgayTao, NguoiTao, NgayCapNhat, NguoiCapNhat } =
      req.body;

    const result = await mssql.query(
      `
                      UPDATE SanPham_Mau
                      SET GhiChu = '${GhiChu}', 
                      NgayTao = '${NgayTao}', 
                      NguoiTao = N'${NguoiTao}',
                      NgayCapNhat = '${NgayCapNhat}',
                      NguoiCapNhat = '${NguoiCapNhat}'
                      WHERE MauSP_Id = '${MauSP_Id}'
                  `
    );
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while updating color-product." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { MauSP_Id } = req.body;
    await mssql.query(`DELETE FROM SanPham_Mau WHERE MauSP_Id = '${MauSP_Id}'`);
    res.status(200).json({
      message: `The color-product with MauSP_Id: "${MauSP_Id}" has been deleted.`,
    });
  } catch (error) {
    res.status(500).json({ error: "Error while deleting color-product." });
  }
});

module.exports = router;
