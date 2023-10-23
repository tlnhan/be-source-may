const express = require("express");
const router = express.Router();
const mssql = require("mssql");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("SELECT * FROM DM_ChiTiet");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while getting list-detail." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      MaChiTiet,
      TenChiTiet,
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
            INSERT INTO DM_ChiTiet (
              [MaChiTiet],
              [TenChiTiet],
              [VietTat],
              [GhiChu],
              [TamNgung],
              [Createdate],
              [Create_User],
              [Update_Date],
              [Update_User]
            ) VALUES (
              '${MaChiTiet}',
              N'${TenChiTiet}',
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
    res.status(500).json({ error: "Error while adding list-detail." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const {
      MaChiTiet,
      TenChiTiet,
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
                  UPDATE DM_ChiTiet
                  SET TenChiTiet = '${TenChiTiet}', 
                  VietTat = '${VietTat}', 
                  GhiChu = '${GhiChu}', 
                  TamNgung = '${TamNgung}', 
                  Createdate = '${Createdate}', 
                  Create_User = '${Create_User}', 
                  Update_Date = N'${Update_Date}', 
                  Update_User = '${Update_User}', 
                  WHERE MaChiTiet = '${MaChiTiet}'
              `
    );
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while updating list-detail." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { MaChiTiet } = req.body;
    await mssql.query(
      `DELETE FROM DM_ChiTiet WHERE MaChiTiet = '${MaChiTiet}'`
    );
    res
      .status(200)
      .json({
        message: `The list-detail with MaChiTiet: ${MaChiTiet} has been deleted.`,
      });
  } catch (error) {
    res.status(500).json({ error: "Error while deleting list-detail." });
  }
});

module.exports = router;
