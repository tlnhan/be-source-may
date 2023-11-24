const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.postLockOrOpenOutput = async (req, res) => {
  try {
    const { Action, NgaySanLuong, NhanVien_ID, UserID } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("Action", mssql.NVarChar(50), Action);
    request.input("NgaySanLuong", mssql.Date, NgaySanLuong);
    request.input("NhanVien_ID", mssql.Int, NhanVien_ID);
    request.input("UserID", mssql.Int, UserID);

    await request.execute("sp_KhoaMoSanLuong");

    res.status(200).json({ message: "The operation yields success." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Output operation failed.",
    });
  }
};
