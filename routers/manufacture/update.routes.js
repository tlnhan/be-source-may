const express = require("express");
const router = express.Router();
const mssql = require("mssql");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("SELECT * FROM CapNhatSanLuong");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while getting update-output." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      PhanCong_Id,
      NgaySanLuong,
      ThoiGianSanLuong,
      SoLuong,
      KhoaSanLuong,
      NgayKhoaSanLuong,
      NguoiKhoaSanLuong,
      NgayTao,
      NgayCapNhat,
    } = req.body;

    await mssql.query(
        `
              INSERT INTO CapNhatSanLuong (
                [PhanCong_Id],
                [NgaySanLuong],
                [ThoiGianSanLuong],
                [SoLuong],
                [KhoaSanLuong],
                [NgayKhoaSanLuong],
                [NguoiKhoaSanLuong],
                [NgayTao],
                [NgayCapNhat],
              ) VALUES (
                '${PhanCong_Id}',
                '${NgaySanLuong}',
                '${ThoiGianSanLuong}',
                '${SoLuong}',
                '${KhoaSanLuong}',
                '${NgayKhoaSanLuong}',
                N'${NguoiKhoaSanLuong}',
                '${NgayTao}',
                '${NgayCapNhat}'
              )
                `
      );
      res
        .status(200)
        .json({ message: "The update output has been added successfully ." });
    } catch (error) {
      res.status(500).json({ error: "Error while adding update-output." });
    }
});

router.put("/", async (req, res, next) => {
  try {
    const {
      PhanCong_Id,
      NgaySanLuong,
      ThoiGianSanLuong,
      SoLuong,
      KhoaSanLuong,
      NgayKhoaSanLuong,
      NguoiKhoaSanLuong,
      NgayTao,
      NgayCapNhat,
    } = req.body;

    await mssql.query(
      `
                  UPDATE CapNhatSanLuong
                  SET NgaySanLuong = '${NgaySanLuong}', 
                  ThoiGianSanLuong = '${ThoiGianSanLuong}', 
                  SoLuong = '${SoLuong}', 
                  KhoaSanLuong = '${KhoaSanLuong}', 
                  NgayKhoaSanLuong = '${NgayKhoaSanLuong}', 
                  NguoiKhoaSanLuong = N'${NguoiKhoaSanLuong}', 
                  NgayTao = '${NgayTao}', 
                  NgayCapNhat = '${NgayCapNhat}'
                  WHERE PhanCong_Id = '${PhanCong_Id}' 

              `
    );
    res.status(200).json({ message: "The update-output has been updated." });
  } catch (error) {
    res.status(500).json({ error: "Error while updating update-output." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const PhanCong_Id = req.body;
    await mssql.query(`DELETE FROM CapNhatSanLuong WHERE PhanCong_Id = '${PhanCong_Id}'`);
    res.status(200).json({ message: "The update-output has been deleted." });
} catch (error) {
    res.status(500).json({ error: 'Error while deleting update-output.' });
}
});

module.exports = router;
