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
    const { MauSP_Id, GhiChu, NgayTao, NguoiTao, NgayCapNhat, NguoiCapNhat } =
      req.body;

    await mssql.query(
      `
                    INSERT INTO SanPham_Mau (
                        [MauSP_Id],
                        [GhiChu],
                        [NgayTao],
                        [NguoiTao],
                        [NgayCapNhat],
                        [NguoiCapNhat]
                    ) VALUES (
                      '${MauSP_Id}',
                      '${GhiChu}',
                      N'${NguoiTao}',
                      '${NgayTao}',
                      '${NgayCapNhat}',
                      N'${NguoiCapNhat}'
                    )
                      `
    );
    res
      .status(200)
      .json({ message: "The color-product has been added successfully ." });
  } catch (error) {
    res.status(500).json({ error: "Error while adding color-product." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { MauSP_Id, GhiChu, NgayTao, NguoiTao, NgayCapNhat, NguoiCapNhat } =
      req.body;

    await mssql.query(
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
    res.status(200).json({ message: "The color-product has been updated." });
  } catch (error) {
    res.status(500).json({ error: "Error while updating color-product." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const MauSP_Id = req.body.MauSP_Id;
    await mssql.query(
      `DELETE FROM SanPham_Mau WHERE MauSP_Id = '${MauSP_Id}'`
    );
    res.status(200).json({ message: "The color-product has been deleted." });
  } catch (error) {
    res.status(500).json({ error: "Error while deleting color-product." });
  }
});

module.exports = router;
