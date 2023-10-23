const express = require("express");
const router = express.Router();
const mssql = require("mssql");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("SELECT * FROM DM_Size");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while getting list-size." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      Ma,
      Ten,
      SizeCongTy,
      NgayTao,
      NguoiTao_ID,
      NgayCapNhat,
      NguoiCapNhat,
    } = req.body;

    await mssql.query(
      `
          INSERT INTO DM_Size (
            [Ma],
            [Ten],
            [SizeCongTy],
            [NgayTao],
            [NguoiTao_ID],
            [NgayCapNhat],
            [NguoiCapNhat]
          ) VALUES (
            '${Ma}',
            N'${Ten}',
            '${SizeCongTy}',
            '${NgayTao}',
            '${NguoiTao_ID}',
            '${NgayCapNhat}',
            N'${NguoiCapNhat}',
          )
            `
    );
    res
      .status(200)
      .json({ message: "The list-size has been added successfully ." });
  } catch (error) {
    res.status(500).json({ error: "Error while adding list-size." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const {
      Ma,
      Ten,
      SizeCongTy,
      NgayTao,
      NguoiTao_ID,
      NgayCapNhat,
      NguoiCapNhat,
    } = req.body;

    await mssql.query(
      `
                UPDATE DM_Size
                SET Ten = N'${Ten}', 
                SizeCongTy = '${SizeCongTy}', 
                NgayTao = '${NgayTao}', 
                NguoiTao_ID = '${NguoiTao_ID}', 
                NgayCapNhat = '${NgayCapNhat}', 
                NguoiCapNhat = N'${NguoiCapNhat}', 
                WHERE Ma = '${Ma}'
            `
    );
    res.status(200).json({ message: "The list-size has been updated." });
  } catch (error) {
    res.status(500).json({ error: "Error while updating list-size." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { Ma } = req.body;
    await mssql.query(`DELETE FROM DM_Size WHERE Ma = '${Ma}'`);
    res.status(200).json({ message: "The list-size has been deleted." });
  } catch (error) {
    res.status(500).json({ error: "Error while deleting list-size." });
  }
});

module.exports = router;
