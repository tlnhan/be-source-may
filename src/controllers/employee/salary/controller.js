const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.getSalaryEmployees = async (req, res) => {
  try {
    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    const result = await request.execute("sp_TinhLuongNhanVien");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error: "Error when getting list of salary employee information.",
      });
  }
};
