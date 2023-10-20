const express = require("express");
const router = express.Router();
const mssql = require("mssql");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("SELECT * FROM DM_SanPham");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while getting products." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      MaSP,
      TenSP,
      Tentat,
      GhiChu,
      LoaiSP_ID,
      DVT_ID,
      TamNgung,
      Createdate,
      Create_User,
      Update_Date,
      Update_User,
    } = req.body;

    await mssql.query(
      `
                  INSERT INTO DM_SanPham (
                    [TenSP],
                    [Tentat],
                    [GhiChu],
                    [LoaiSP_ID],
                    [DVT_ID],
                    [TamNgung],
                    [Createdate],
                    [Create_User],
                    [Update_Date],
                    [Update_User]
                  ) VALUES (
                    '${MaSP}',
                    N'${TenSP}',
                    N'${Tentat}',
                    '${GhiChu}',
                    '${LoaiSP_ID}',
                    '${DVT_ID}',
                    '${TamNgung}',
                    '${Createdate}',
                    '${Create_User}',
                    '${Update_Date}',
                    '${Update_User}'
                  )
                    `
    );
    res
      .status(200)
      .json({ message: "The product has been added successfully ." });
  } catch (error) {
    res.status(500).json({ error: "Error while adding product." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const {
      MaSP,
      TenSP,
      Tentat,
      GhiChu,
      LoaiSP_ID,
      DVT_ID,
      TamNgung,
      Createdate,
      Create_User,
      Update_Date,
      Update_User,
    } = req.body;

    await mssql.query(
      `
                  INSERT INTO DM_SanPham (
                    [TenSP],
                    [Tentat],
                    [GhiChu],
                    [LoaiSP_ID],
                    [DVT_ID],
                    [TamNgung],
                    [Createdate],
                    [Create_User],
                    [Update_Date],
                    [Update_User]
                  ) VALUES (
                    N'${TenSP}',
                    N'${Tentat}',
                    '${GhiChu}',
                    '${LoaiSP_ID}',
                    '${DVT_ID}',
                    '${TamNgung}',
                    '${Createdate}',
                    '${Create_User}',
                    '${Update_Date}',
                    '${Update_User}'
                    WHERE MaSP = '${MaSP}'
                  )
                    `
    );
    res
      .status(200)
      .json({ message: "The product has been added successfully ." });
  } catch (error) {
    res.status(500).json({ error: "Error while adding product." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const MaSP = req.body;
    await mssql.query(`DELETE FROM DM_SanPham WHERE MaSP = '${MaSP}'`);
    res.status(200).json({ message: "The product has been deleted." });
  } catch (error) {
    res.status(500).json({ error: "Error while deleting product." });
  }
});

module.exports = router;
