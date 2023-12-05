const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.getListSizeProducts = async (req, res) => {
  try {
    const result = await mssql.query("EXEC sp_DSSize");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when getting list of list size information." });
  }
};

exports.postListSizeProduct = async (req, res) => {
  try {
    const { Ma, TenSize, SizeCTy } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("MaSize", mssql.NVarChar(10), Ma);
    request.input("TenSize", mssql.NVarChar(255), TenSize);
    request.input("SizeCTy", mssql.Float, SizeCTy)

    await request.execute("sp_ThemSize");

    res.status(201).json({ message: "Added information of a successful list size." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when adding information of a list size." });
  }
};

exports.putListSizeProduct = async (req, res) => {
  try {
    const { SizeSP_Id, Ma, TenSize, SizeCTy } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("SizeSP_Id", mssql.Int, SizeSP_Id);
    request.input("MaSize", mssql.NVarChar(10), Ma);
    request.input("TenSize", mssql.NVarChar(255), TenSize);
    request.input("SizeCTy", mssql.Float, SizeCTy)
    
    await request.execute("sp_CapNhatSize");

    res
      .status(200)
      .json({ message: "Updated information of a successful list size." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when updating information of a list size." });
  }
};

exports.deleteListSizeProduct = async (req, res) => {
  try {
    const { Size_ID } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("Size_ID", mssql.Int, Size_ID);

    await request.execute("sp_XoaSize");

    res.status(200).json({ message: "Deleted information of a successful list size." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when deleting information of a list size." });
  }
};