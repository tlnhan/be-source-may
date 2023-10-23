const express = require("express");
const router = express.Router();
const mssql = require("mssql");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("SELECT * FROM DM_Loai");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while getting list-kind." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { Ten, TenTat, ChungLoai } = req.body;

    const result = await mssql.query(
      `
                INSERT INTO DM_Loai (
                    [Ten],
                    [TenTat],
                    [ChungLoai]
                ) VALUES (
                  N'${Ten}',
                  '${TenTat}',
                  N'${ChungLoai}'
                )
                  `
    );
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while adding list-kind." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { Ten, TenTat, ChungLoai } = req.body;

    const result = await mssql.query(
      `
                      UPDATE DM_Loai
                      SET Ten = '${Ten}', 
                      TenTat = '${TenTat}', 
                      WHERE ChungLoai = '${ChungLoai}'
                  `
    );
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while updating list-kind." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { ChungLoai } = req.body;
    await mssql.query(`DELETE FROM DM_Loai WHERE ChungLoai = '${ChungLoai}'`);
    res.status(200).json({
      message: `The list-kind with ChungLoai: ${ChungLoai} has been deleted.`,
    });
  } catch (error) {
    res.status(500).json({ error: "Error while deleting list-kind." });
  }
});

module.exports = router;
