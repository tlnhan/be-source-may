const express = require("express");
const router = express.Router();
const mssql = require("mssql");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("SELECT * FROM DM_LoaiSP");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while getting list-kind-product." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      Ma,
      Ten,
      Tentat,
      GhiChu,
      ChungLoai_Id,
      TamNgung,
      Createdate,
      Create_User,
      Update_Date,
      Update_User,
    } = req.body;

    const result = await mssql.query(
      `
                INSERT INTO DM_LoaiSP (
                    [Ma],
                    [Ten],
                    [Tentat],
                    [GhiChu],
                    [ChungLoai_Id],
                    [TamNgung],
                    [Createdate],
                    [Create_User],
                    [Update_Date],
                    [Update_User]
                ) VALUES (
                  '${Ma}',
                  N'${Ten}',
                  '${Tentat}',
                  N'${GhiChu}',
                  '${ChungLoai_Id}',
                  '${TamNgung}',
                  '${Createdate}',
                  N'${Create_User}',
                  '${Update_Date}',
                  N'${Update_User}'
                )
                  `
    );
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while adding list-kind-product." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const {
      Ma,
      Ten,
      Tentat,
      GhiChu,
      ChungLoai_Id,
      TamNgung,
      Createdate,
      Create_User,
      Update_Date,
      Update_User,
    } = req.body;

    const result = await mssql.query(
      `
                      UPDATE DM_LoaiSP
                      SET Ten = '${Ten}', 
                      Tentat = '${Tentat}', 
                      GhiChu = '${GhiChu}', 
                      ChungLoai_Id = '${ChungLoai_Id}',
                      TamNgung = '${TamNgung}', 
                      Createdate = '${Createdate}', 
                      Create_User = N'${Create_User}', 
                      Update_Date = '${Update_Date}', 
                      Update_User = '${Update_User}',
                      WHERE Ma = '${Ma}'
                  `
    );
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while updating list-kind-product." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { Ma } = req.body;
    await mssql.query(`DELETE FROM DM_LoaiSP WHERE Ma = '${Ma}'`);
    res.status(200).json({
      message: `The list-kind-product with Ma: ${Ma} has been deleted.`,
    });
  } catch (error) {
    res.status(500).json({ error: "Error while deleting list-kind-product." });
  }
});

module.exports = router;
