const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.postLockOutput = async (req, res) => {
  try {
    const { UserID, NgaySanLuong } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("Action", mssql.NVarChar(50), "lock");
    request.input("UserID", mssql.Int, UserID);
    request.input("NgaySanLuong", mssql.Date, NgaySanLuong);

    await request.execute("sp_KhoaMoSanLuongNgay");

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
    const { UserID, NgaySanLuong } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("Action", mssql.NVarChar(50), "unlock");
    request.input("UserID", mssql.Int, UserID);
    request.input("NgaySanLuong", mssql.Date, NgaySanLuong);

    await request.execute("sp_KhoaMoSanLuongNgay");

    res.status(200).json({ message: "The operation yields success." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Output operation failed.",
    });
  }
};

exports.postLockPersonOutput = async (req, res) => {
  try {
    const { NhanVien_ID, UserID } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("Action", mssql.NVarChar(50), "lock");
    request.input("UserID", mssql.Int, UserID);
    request.input("NhanVien_ID", mssql.Int, NhanVien_ID);

    await request.execute("sp_KhoaMoSanLuongNhanVien");

    res.status(200).json({ message: "The operation yields success." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Output operation failed.",
    });
  }
};

exports.postOpenPersonOutput = async (req, res) => {
  try {
    const { NhanVien_ID, UserID } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("Action", mssql.NVarChar(50), "unlock");
    request.input("NhanVien_ID", mssql.Int, NhanVien_ID);
    request.input("UserID", mssql.Int, UserID);

    await request.execute("sp_KhoaMoSanLuongNhanVien");

    res.status(200).json({ message: "The operation yields success." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Output operation failed.",
    });
  }
};