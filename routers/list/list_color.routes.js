const express = require("express");
const router = express.Router();
const mssql = require("mssql");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("SELECT * FROM DM_MauSP");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while getting list-color." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      MaMau,
      TenMau,
      MS,
      NgayTao,
      NguoiTao_ID,
      NgayCapNhat,
      NguoiCapNhat,
    } = req.body;

    const result = await mssql.query(
      `
                INSERT INTO DM_MauSP (
                    [MaMau],
                    [TenMau],
                    [MS],
                    [NgayTao],
                    [NguoiTao_ID],
                    [NgayCapNhat],
                    [NguoiCapNhat]
                ) VALUES (
                  '${MaMau}',
                  N'${TenMau}',
                  '${MS}',
                  '${NgayTao}',
                  '${NguoiTao_ID}',
                  '${NgayCapNhat}',
                  N'${NguoiCapNhat}'
                )
                  `
    );
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while adding list-color." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const {
      MaMau,
      TenMau,
      MS,
      NgayTao,
      NguoiTao_ID,
      NgayCapNhat,
      NguoiCapNhat,
    } = req.body;

    const result = await mssql.query(
      `
                      UPDATE DM_MauSP
                      SET TenMau = N'${TenMau}', 
                      MS = '${MS}', 
                      NgayTao = '${NgayTao}', 
                      NguoiTao_ID = '${NguoiTao_ID}', 
                      NgayCapNhat = '${NgayCapNhat}', 
                      NguoiCapNhat = N'${NguoiCapNhat}', 
                      WHERE MaMau = '${MaMau}'
                  `
    );
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while updating list-color." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { MaMau } = req.body;
    await mssql.query(`DELETE FROM DM_MauSP WHERE MaMau = '${MaMau}'`);
    res.status(200).json({
      message: `The list-color with MaMau: ${MaMau} has been deleted.`,
    });
  } catch (error) {
    res.status(500).json({ error: "Error while deleting list-color." });
  }
});

module.exports = router;
