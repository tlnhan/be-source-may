const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.getDisplayEmployeesByOutputStatus = async (req, res) => {
  try {
    const pool = await mssql.connect(mssqlConfig);
    const result = await pool
      .request()
      .execute("sp_HienThiNhanVienTheoTrangThaiSanLuong");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when getting list of display employees by output status." });
  }
};
