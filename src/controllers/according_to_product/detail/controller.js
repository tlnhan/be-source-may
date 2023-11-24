const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.postDetailAccordingToProduct = async (req, res) => {
  try {
    const {
      Action,
      SanPham_Id,
      ChiTiet_Id,
      MaCT,
      TenCT,
      DonGia,
      NguoiTao,
      NguoiCapNhat,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("Action", mssql.NVarChar(50), Action);
    request.input("SanPham_Id", mssql.Int, SanPham_Id);
    request.input("ChiTiet_Id", mssql.Int, ChiTiet_Id);
    request.input("MaCT", mssql.VarChar(15), MaCT);
    request.input("TenCT", mssql.NVarChar(150), TenCT);
    request.input("DonGia", mssql.Float, DonGia);
    request.input("NguoiTao", mssql.NVarChar(50), NguoiTao);
    request.input("NguoiCapNhat", mssql.NVarChar(50), NguoiCapNhat);

    const result = await request.execute("sp_ChiTietTheoSanPham");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when adding detail to product." });
  }
};
