const express = require("express");
const router = express.Router();
const mssql = require("mssql");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("SELECT * FROM SanPham_ChiTiet");
    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while getting detail-product." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { ChiTiet_ID, DonGia, NgayTao, NguoiTao, NgayCapNhat, NguoiCapNhat } =
      req.body;

    const result = await mssql.query(
      `
                        INSERT INTO SanPham_ChiTiet (
                            [ChiTiet_ID],
                            [DonGia],
                            [NgayTao],
                            [NguoiTao],
                            [NgayCapNhat],
                            [NguoiCapNhat]
                        ) VALUES (
                          '${ChiTiet_ID}',
                          '${DonGia}',
                          '${NgayTao}',
                          N'${NguoiTao}',
                          '${NgayCapNhat}',
                          N'${NguoiCapNhat}'
                        )
                          `
    );
    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while adding detail-product." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { ChiTiet_ID, DonGia, NgayTao, NguoiTao, NgayCapNhat, NguoiCapNhat } =
      req.body;

    const result = await mssql.query(
      `
                          UPDATE SanPham_ChiTiet
                          SET DonGia = '${DonGia}', 
                          NgayTao = '${NgayTao}', 
                          NguoiTao = N'${NguoiTao}',
                          NgayCapNhat = '${NgayCapNhat}',
                          NguoiCapNhat = '${NguoiCapNhat}'
                          WHERE ChiTiet_ID = '${ChiTiet_ID}'
                      `
    );
    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while updating detail-product." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { ChiTiet_ID } = req.body;
    await mssql.query(
      `DELETE FROM SanPham_ChiTiet WHERE ChiTiet_ID = '${ChiTiet_ID}'`
    );
    res.status(200).json({
      message: `The detail-product with ChiTiet_ID: ${ChiTiet_ID} has been deleted.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while deleting detail-product." });
  }
});

module.exports = router;
