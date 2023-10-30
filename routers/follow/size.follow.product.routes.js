const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database");

router.get("/", async (req, res, next) => {
  try {
    const { SanPham_Id } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    const result = await request
      .input("Action", mssql.NVarChar(50), "Select")
      .input("SanPham_Id", mssql.Int, SanPham_Id)
      .execute("sp_SizeTheoSanPham");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Lỗi khi lấy danh sách kích thước theo sản phẩm." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { SanPham_Id, SizeMoi } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    await request
      .input("Action", mssql.NVarChar(50), "Insert")
      .input("SanPham_Id", mssql.Int, SanPham_Id)
      .input("SizeMoi", mssql.NVarChar(255), SizeMoi)
      .execute("sp_SizeTheoSanPham");

    res.status(201).json({ message: "Kích thước đã được thêm vào sản phẩm." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi thêm kích thước vào sản phẩm." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { SanPham_Id, SizeSP_Id, TenSize } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    await request
      .input("Action", mssql.NVarChar(50), "Update")
      .input("SanPham_Id", mssql.Int, SanPham_Id)
      .input("SizeSP_Id", mssql.Int, SizeSP_Id)
      .input("TenSize", mssql.NVarChar(255), TenSize)
      .execute("sp_SizeTheoSanPham");

    res
      .status(200)
      .json({ message: "Thông tin kích thước sản phẩm đã được cập nhật." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi cập nhật kích thước sản phẩm." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { SanPham_Id, SizeSP_Id } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    await request
      .input("Action", mssql.NVarChar(50), "Delete")
      .input("SanPham_Id", mssql.Int, SanPham_Id)
      .input("SizeSP_Id", mssql.Int, SizeSP_Id)
      .execute("sp_SizeTheoSanPham");

    res.status(200).json({ message: "Kích thước sản phẩm đã được xóa." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi xóa kích thước sản phẩm." });
  }
});

module.exports = router;
