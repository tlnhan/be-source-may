const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.getListColors = async (req, res) => {
  try {
    const result = await mssql.query("EXEC sp_DSMau");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when getting list of color information." });
  }
};

exports.postListColor = async (req, res) => {
  try {
    const { TenMau, MS, NguoiTao } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("TenMau", mssql.NVarChar(255), TenMau);
    request.input("MS", mssql.FLOAT, MS);
    request.input("NguoiTao", mssql.NVarChar(50), NguoiTao);

    await request.execute("sp_ThemMau");

    res.status(201).json({ message: "Added information of a successful list color." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when adding information of a list color." });
  }
};

exports.putListColor = async (req, res) => {
  try {
    const { MauSP_Id, TenMau, MS, NguoiTao } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("MauSP_Id", mssql.Int, MauSP_Id);
    request.input("TenMau", mssql.NVarChar(255), TenMau);
    request.input("MS", mssql.FLOAT, MS);
    request.input("NguoiTao", mssql.NVarChar(50), NguoiTao);

    await request.execute("sp_CapNhatMau");

    res
      .status(200)
      .json({ message: "Updated information of a successful list color." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when updating information of a list color." });
  }
};

exports.deleteListColor = async (req, res) => {
  try {
    const { MauSP_Id } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("MauSP_Id", mssql.Int, MauSP_Id);

    await request.execute("sp_XoaMau");

    res.status(200).json({ message: "Deleted information of a successful list color." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when deleting information of a list color." });
  }
};
