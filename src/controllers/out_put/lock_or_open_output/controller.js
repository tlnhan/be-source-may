const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.postLockOutput = async (req, res) => {
  try {
    const { SanLuong_Id, UserID } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("Action", mssql.NVarChar(50), "lock");
    request.input("UserID", mssql.Int, UserID);
    request.input("SanLuong_Id", mssql.Int, SanLuong_Id);

    await request.execute("sp_KhoaMoSanLuongMau");

    res.status(200).json({ message: "The operation yields success." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Output operation failed.",
    });
  }
};

exports.postOpenOutput = async (req, res) => {
  try {
    const { SanLuong_Id, UserID } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("Action", mssql.NVarChar(50), "unlock");
    request.input("SanLuong_Id", mssql.Int, SanLuong_Id);
    request.input("UserID", mssql.Int, UserID);

    await request.execute("sp_KhoaMoSanLuongMau");

    res.status(200).json({ message: "The operation yields success." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Output operation failed.",
    });
  }
};