const express = require("express");
const router = express.Router();
const mssql = require("mssql");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("SELECT * FROM SanPham_Size");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while getting size-product." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { Size_Id, GhiChu, NgayTao, NguoiTao, NgayCapNhat, NguoiCapNhat } =
      req.body;

    await mssql.query(
      `
                        INSERT INTO SanPham_Size (
                            [Size_Id],
                            [GhiChu],
                            [NgayTao],
                            [NguoiTao],
                            [NgayCapNhat],
                            [NguoiCapNhat]
                        ) VALUES (
                          '${Size_Id}',
                          '${GhiChu}',
                          '${NgayTao}',
                          N'${NguoiTao}',
                          '${NgayCapNhat}',
                          N'${NguoiCapNhat}'
                        )
                          `
    );
    res
      .status(200)
      .json({ message: "The size-product has been added successfully ." });
  } catch (error) {
    res.status(500).json({ error: "Error while adding size-product." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { Size_Id, GhiChu, NgayTao, NguoiTao, NgayCapNhat, NguoiCapNhat } =
      req.body;

    await mssql.query(
      `
                          UPDATE SanPham_Size
                          SET GhiChu = '${GhiChu}', 
                          NgayTao = '${NgayTao}', 
                          NguoiTao = N'${NguoiTao}',
                          NgayCapNhat = '${NgayCapNhat}',
                          NguoiCapNhat = N'${NguoiCapNhat}'
                          WHERE Size_Id = '${Size_Id}'
                      `
    );
    res.status(200).json({ message: "The size-product has been updated." });
  } catch (error) {
    res.status(500).json({ error: "Error while updating size-product." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const Size_Id = req.body;
    await mssql.query(`DELETE FROM SanPham_Size WHERE Size_Id = ${Size_Id}`);
    res.status(200).json({ message: "The size-product has been deleted." });
  } catch (error) {
    res.status(500).json({ error: "Error while deleting size-product." });
  }
});

module.exports = router;
