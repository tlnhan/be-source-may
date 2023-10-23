const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database.config");

router.get("/", async (req, res, next) => {
  try {
    const pool = await mssql.connect(mssqlConfig);

    const result = await pool.request().execute("sp_DanhSachSanPham");

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the product list." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const pool = await mssql.connect(mssqlConfig);

    const {
      MaSP,
      TenSP,
      DVT_ID,
      LoaiSP_ID,
      Mau,
      Size,
      SoLuong,
      GhiChu,
      ChiTiet_ID,
      DonGia,
    } = req.body;

    const result = await pool
      .request()
      .input("Action", mssql.NVarChar(50), "Add")
      .input("MaSP", mssql.NVarChar(50), MaSP)
      .input("TenSP", mssql.NVarChar(150), TenSP)
      .input("DVT_ID", mssql.Int, DVT_ID)
      .input("LoaiSP_ID", mssql.Int, LoaiSP_ID)
      .input("Mau", mssql.NVarChar(50), Mau)
      .input("Size", mssql.NVarChar(10), Size)
      .input("SoLuong", mssql.Int, SoLuong)
      .input("GhiChu", mssql.NVarChar(150), GhiChu)
      .input("ChiTiet_ID", mssql.Int, ChiTiet_ID)
      .input("DonGia", mssql.Float, DonGia)
      .execute("sp_QuanLySanPham");

    res.status(201).json(result.recordset);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while adding the product." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const {
      ProductID,
      MaSP,
      TenSP,
      DVT_ID,
      LoaiSP_ID,
      Mau,
      Size,
      GhiChu,
      ChiTiet_ID,
      DonGia,
    } = req.body;

    const pool = await mssql.connect(config);

    const result = await pool
      .request()
      .input("Action", mssql.NVarChar(50), "Update")
      .input("ProductID", mssql.Int, ProductID)
      .input("MaSP", mssql.NVarChar(50), MaSP)
      .input("TenSP", mssql.NVarChar(150), TenSP)
      .input("DVT_ID", mssql.Int, DVT_ID)
      .input("LoaiSP_ID", mssql.Int, LoaiSP_ID)
      .input("Mau", mssql.NVarChar(50), Mau)
      .input("Size", mssql.NVarChar(10), Size)
      .input("GhiChu", mssql.NVarChar(150), GhiChu)
      .input("ChiTiet_ID", mssql.Int, ChiTiet_ID)
      .input("DonGia", mssql.Float, DonGia)
      .execute("sp_QuanLySanPham");

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the product." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { ProductID } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    await pool
      .request()
      .input("Action", mssql.NVarChar(50), "Delete")
      .input("ProductID", mssql.Int, ProductID)
      .execute("sp_QuanLySanPham");

    res.status(204).json({
      message: `Product with ProductID: "${ProductID}" deleted successfully.`,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the product." });
  }
});

module.exports = router;
