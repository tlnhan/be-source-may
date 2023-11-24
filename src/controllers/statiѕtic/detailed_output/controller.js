const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.getDetailedProductStatistic = async (req, res) => {
  try {
    const { TuNgay, DenNgay } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("TuNgay", mssql.Date, TuNgay);
    request.input("DenNgay", mssql.Date, DenNgay);

    const result = await request.execute("sp_ThongKeSanLuongChiTiet");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when getting detailed product statistic list." });
  }
};
