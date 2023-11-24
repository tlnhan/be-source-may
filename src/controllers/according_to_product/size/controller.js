const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.getSizeAccordingToProduct = async (req, res) => {
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
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when getting size list by product." });
  }
};

exports.postSizeAccordingToProduct = async (req, res) => {
  try {
    const { SanPham_Id, SizeMoi } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    await request
      .input("Action", mssql.NVarChar(50), "Insert")
      .input("SanPham_Id", mssql.Int, SanPham_Id)
      .input("SizeMoi", mssql.NVarChar(255), SizeMoi)
      .execute("sp_SizeTheoSanPham");

    res.status(200).json({ message: "Size has been added to the product." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when adding size to product." });
  }
};

exports.putSizeAccordingToProduct = async (req, res) => {
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
      .json({ message: "Product size information has been updated." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating product size." });
  }
};

exports.deleteSizeAccordingToProduct = async (req, res) => {
  try {
    const { SanPham_Id, SizeSP_Id } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    await request
      .input("Action", mssql.NVarChar(50), "Delete")
      .input("SanPham_Id", mssql.Int, SanPham_Id)
      .input("SizeSP_Id", mssql.Int, SizeSP_Id)
      .execute("sp_SizeTheoSanPham");

    res.status(200).json({ message: "Product size has been deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when deleting product size." });
  }
};
