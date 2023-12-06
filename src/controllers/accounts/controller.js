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

    request.output("ResultCode", mssql.Int);

    const result = await request.execute("sp_ThemTaiKhoan");

    if (result.output.ResultCode === 0) {
      return res.status(200).json({
        message: "Added information of a successful account.",
      });
    } else {
      return res.status(404).json({
        message:
          "MaNV or Username is already taken, please choose different ones.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error when adding information of an account.",
    });
  }
};

exports.getAccount = async (req, res) => {
  try {
    const { MaNV } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("Action", mssql.VarChar(50), "GET");
    request.input("MaNV", mssql.NVarChar(200), MaNV);

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

    const result = await request.execute("sp_LayDanhSachTaiKhoan");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error when getting information of a detail account.",
    });
  }
};

exports.changePass = async (req, res) => {
  try {
    const { MaNV, Pass } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("MaNV", mssql.NVarChar(20), MaNV);
    request.input("NewPass", mssql.NVarChar(100), Pass);

    const result = await request.execute("sp_CapLaiMatKhau");

    res.status(200).json({ message: "Changed password successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error when updating password.",
    });
  }
};
