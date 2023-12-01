const mssql = require("mssql");
const mssqlConfig = require("../../db/mssql");

exports.postAccount = async (req, res) => {
  try {
    const { MaNV, Username, Pass, VaiTro } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("MaNV", mssql.NVarChar(200), MaNV);
    request.input("Username", mssql.NVarChar(200), Username);
    request.input("Pass", mssql.NVarChar(100), Pass);
    request.input("VaiTro", mssql.VarChar(50), VaiTro);

    await request.execute("sp_ThemTaiKhoan");

    res
      .status(200)
      .json({
        message: "Added information of a successful account.",
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error: "Error when adding information of a account.",
      });
  }
};

exports.getAccount = async (req, res) => {
  try {
    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("Action", mssql.VarChar(50), "GET");

    const resut = await request.execute("sp_LayDanhSachTaiKhoan");

    res.status(200).json(resut.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error when getting information of a account.",
    });
  }
};

exports.detailAccount = async (req, res) => {
  try {
    const { MaNV } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("MaNV", mssql.NVarChar(50), MaNV);
    request.input("Action", mssql.NVarChar(50), "DETAIL");

    await request.execute("sp_LayDanhSachTaiKhoan");

    res.status(200).json({
      message: "Got information of a successful detail account.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error when getting information of a detail account.",
    });
  }
};