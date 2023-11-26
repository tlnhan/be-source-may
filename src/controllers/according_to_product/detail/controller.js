const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.getDetailAccordingToProduct = async (req, res) => {
  try {
    const { SanPham_Id } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("Action", mssql.NVarChar(50), "Select");
    request.input("SanPham_Id", mssql.Int, SanPham_Id);

    const result = await request.execute("sp_ChiTietTheoSanPham");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when getting detail to product." });
  }
};

exports.postDetailAccordingToProduct = async (req, res) => {
  try {
    const { MaCT, TenCT, NguoiTao } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("Action", mssql.NVarChar(50), "Insert");
    request.input("MaCT", mssql.VarChar(15), MaCT);
    request.input("TenCT", mssql.NVarChar(150), TenCT);
    request.input("NguoiTao", mssql.NVarChar(50), NguoiTao);

    const result = await request.execute("sp_ChiTietTheoSanPham");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when adding detail to product." });
  }
};

exports.putDetailAccordingToProduct = async (req, res) => {
  try {
    const { ChiTiet_Id, MaCT, TenCT, NguoiCapNhat } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("Action", mssql.NVarChar(50), "Update");
    request.input("ChiTiet_Id", mssql.Int, ChiTiet_Id);
    request.input("MaCT", mssql.VarChar(15), MaCT);
    request.input("TenCT", mssql.NVarChar(150), TenCT);
    request.input("NguoiCapNhat", mssql.NVarChar(50), NguoiCapNhat);

    const result = await request.execute("sp_ChiTietTheoSanPham");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when adding detail to product." });
  }
};

exports.deleteDetailAccordingToProduct = async (req, res) => {
  try {
    const { SanPham_Id } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("Action", mssql.NVarChar(50), "Delete");
    request.input("SanPham_Id", mssql.Int, SanPham_Id);

    const result = await request.execute("sp_ChiTietTheoSanPham");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when deleting detail to product." });
  }
};
