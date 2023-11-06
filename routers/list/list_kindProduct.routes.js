const express = require("express");
const router = express.Router();
const mssql = require("mssql");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("SELECT * FROM DM_ChungLoaiSP");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy danh sách chủng loại sản phẩm." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      Ma,
      Ten,
      KyHieu,
      Tentat,
      GhiChu,
      TamNgung,
      Createdate,
      Create_User,
      Update_Date,
      Update_User,
    } = req.body;

    const result = await mssql.query(
      `
                INSERT INTO DM_ChungLoaiSP (
                    [Ma],
                    [Ten],
                    [KyHieu],
                    [Tentat],
                    [GhiChu],
                    [TamNgung],
                    [Createdate],
                    [Create_User],
                    [Update_Date],
                    [Update_User]
                ) VALUES (
                  '${Ma}',
                  N'${Ten}',
                  '${KyHieu}',
                  '${Tentat}',
                  N'${GhiChu}',
                  '${TamNgung}',
                  '${Createdate}',
                  N'${Create_User}',
                  '${Update_Date}',
                  N'${Update_User}'
                )
                  `
    );
    res.status(200).json({ message: "Chủng loại sản phẩm đã được thêm." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi thêm chủng loại sản phẩm." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const {
      Ma,
      Ten,
      KyHieu,
      Tentat,
      GhiChu,
      TamNgung,
      Createdate,
      Create_User,
      Update_Date,
      Update_User,
    } = req.body;

    const result = await mssql.query(
      `
                      UPDATE DM_ChungLoaiSP
                      SET Ten = '${Ten}', 
                      KyHieu = '${KyHieu}', 
                      Tentat = '${Tentat}', 
                      GhiChu = '${GhiChu}', 
                      TamNgung = '${TamNgung}', 
                      Createdate = '${Createdate}', 
                      Create_User = N'${Create_User}', 
                      Update_Date = '${Update_Date}', 
                      Update_User = '${Update_User}',
                      WHERE Ma = '${Ma}'
                  `
    );
    res.status(200).json({ message: "Cập nhật chủng loại sản phẩm thành công." });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi cập nhật chủng loại sản phẩm" });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { Ma } = req.body;
    await mssql.query(`DELETE FROM DM_ChungLoaiSP WHERE Ma = '${Ma}'`);
    res.status(200).json({
      message: `Chủng loại sản phẩm đã được xóa.`,
    });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi xóa chủng loại sản phẩm" });
  }
});

module.exports = router;
