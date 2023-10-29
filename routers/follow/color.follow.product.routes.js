const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database");

router.get("/getColors/:SanPham_Id", async (req, res, next) => {
  try {
    const { SanPham_Id } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    const result = await request
      .input("Action", mssql.NVarChar(50), "Select")
      .input("SanPham_Id", mssql.Int, SanPham_Id)
      .execute("sp_MauTheoSanPham");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách màu theo sản phẩm." });
  }
});

router.post("/addColor", async (req, res, next) => {
  try {
    const { SanPham_Id, MauMoi } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    await request
      .input("Action", mssql.NVarChar(50), "Insert")
      .input("SanPham_Id", mssql.Int, SanPham_Id)
      .input("MauMoi", mssql.NVarChar(255), MauMoi)
      .execute("sp_MauTheoSanPham");

    res.status(201).json({ message: "Màu đã được thêm vào sản phẩm." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi thêm màu vào sản phẩm." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { MauSP_Id, TenMau } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    const result = await request
      .input("Action", mssql.NVarChar(50), "Update")
      .input("MauSP_Id", mssql.Int, MauSP_Id)
      .input("TenMau", mssql.NVarChar(255), TenMau)
      .execute("sp_MauTheoSanPham");

    res
      .status(200)
      .json({ message: "Thông tin màu sản phẩm đã được cập nhật." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi cập nhật màu sản phẩm." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { SanPham_Id, MauSP_Id } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    await request
      .input("Action", mssql.NVarChar(50), "Delete")
      .input("SanPham_Id", mssql.Int, SanPham_Id)
      .input("MauSP_Id", mssql.Int, MauSP_Id)
      .execute("sp_MauTheoSanPham");

    res.status(200).json({ message: "Màu sản phẩm đã được xóa." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi xóa màu sản phẩm." });
  }
});

module.exports = router;
