const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.getListMonth = async (req, res) => {
  try {
    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    const result = await request
      .input("name", mssql.NVarChar(50), "month")
      .execute("sp_Load_Month_Year");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when getting list." });
  }
};

exports.getListYear = async (req, res) => {
  try {
    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    const result = await request
      .input("name", mssql.NVarChar(50), "year")
      .execute("sp_Load_Month_Year");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when getting list." });
  }
};