const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.getProductionAssignmentsDetail = async (req, res) => {
  try {
    const { Action, PhanCong_ID, NhanVien_Id } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("Action", mssql.VarChar(50), Action);
    request.input("PhanCong_ID", mssql.Int, PhanCong_ID);
    request.input("NhanVien_Id", mssql.Int, NhanVien_Id);

    const result = await request.execute("sp_LayPhanCongSanXuatChiTiet");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when getting production assignment list detail." });
  }
};
