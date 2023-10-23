const express = require("express");
const router = express.Router();
const mssql = require("mssql");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("SELECT * FROM DM_DVT");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while getting list-dvt." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      MaDVT,
      TenDVT,
      VietTat,
      GhiChu,
      TamNgung,
      Createdate,
      Create_User,
      Update_Date,
      Update_User,
    } = req.body;

    const result = await mssql.query(
      `
                INSERT INTO DM_DVT (
                    [MaDVT],
                    [TenDVT],
                    [VietTat],
                    [GhiChu],
                    [TamNgung],
                    [Createdate],
                    [Create_User],
                    [Update_Date],
                    [Update_User]
                ) VALUES (
                  '${MaDVT}',
                  N'${TenDVT}',
                  '${VietTat}',
                  N'${GhiChu}',
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
    res.status(500).json({ error: "Error while adding list-dvt." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const {
      MaDVT,
      TenDVT,
      VietTat,
      GhiChu,
      TamNgung,
      Createdate,
      Create_User,
      Update_Date,
      Update_User,
    } = req.body;

    const result = await mssql.query(
      `
                      UPDATE DM_DVT
                      SET TenDVT = '${TenDVT}', 
                      VietTat = '${VietTat}', 
                      GhiChu = '${GhiChu}', 
                      TamNgung = '${TamNgung}', 
                      Createdate = '${Createdate}', 
                      Create_User = N'${Create_User}', 
                      Update_Date = '${Update_Date}', 
                      Update_User = '${Update_User}',
                      WHERE MaDVT = '${MaDVT}'
                  `
    );
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while updating list-dvt." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { MaDVT } = req.body;
    await mssql.query(`DELETE FROM DM_DVT WHERE MaDVT = '${MaDVT}'`);
    res.status(200).json({
      message: `The list-dvt with MaDVT: ${MaDVT} has been deleted.`,
    });
  } catch (error) {
    res.status(500).json({ error: "Error while deleting list-dvt." });
  }
});

module.exports = router;
