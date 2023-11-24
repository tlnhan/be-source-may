const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.getColorAccordingToProduct = async (req, res) => {
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
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when getting color list by product." });
  }
};

exports.postColorAccordingToProduct = async (req, res) => {
  try {
    const { SanPham_Id, MauMoi } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    await request
      .input("Action", mssql.NVarChar(50), "Insert")
      .input("SanPham_Id", mssql.Int, SanPham_Id)
      .input("MauMoi", mssql.NVarChar(255), MauMoi)
      .execute("sp_MauTheoSanPham");

    res.status(200).json({ message: "Color has been added to the product." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when adding color to product." });
  }
};

exports.putColorAccordingToProduct = async (req, res) => {
  try {
    const { SanPham_Id, MauMoi, MauSP_Id, TenMau } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    await request
      .input("Action", mssql.NVarChar(50), "Update")
      .input("MauSP_Id", mssql.Int, MauSP_Id)
      .input("TenMau", mssql.NVarChar(255), TenMau)
      .input("SanPham_Id", mssql.Int, SanPham_Id)
      .input("MauMoi", mssql.NVarChar(255), MauMoi)
      .execute("sp_MauTheoSanPham");

    res
      .status(200)
      .json({ message: "Product color information has been updated." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating product color." });
  }
};

exports.deleteColorAccordingToProduct = async (req, res) => {
  try {
    const { SanPham_Id, MauSP_Id } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    await request
      .input("Action", mssql.NVarChar(50), "Delete")
      .input("SanPham_Id", mssql.Int, SanPham_Id)
      .input("MauSP_Id", mssql.Int, MauSP_Id)
      .execute("sp_MauTheoSanPham");

    res.status(200).json({ message: "Product color has been deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when deleting product color." });
  }
};
