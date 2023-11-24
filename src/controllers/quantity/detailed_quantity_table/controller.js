const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.postDetailedQuantityTable = async (req, res) => {
  try {
    const { NhanVien_ID } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("NhanVien_ID", mssql.Int, NhanVien_ID);

    const result = await request.execute("sp_BangLuongChiTiet");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error when adding product quantity table information list.",
    });
  }
};

exports.putDetailedQuantityTable = async (req, res) => {
  try {
    const { Luong_ID, SoLuong, DonGia, DonGiaBoSung, GhiChu, NgayTongHop } =
      req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("Luong_ID", mssql.Int, Luong_ID);
    request.input("SoLuong", mssql.Int, SoLuong);
    request.input("DonGia", mssql.Float, DonGia);
    request.input("DonGiaBoSung", mssql.Float, DonGiaBoSung);
    request.input("GhiChu", mssql.NVarChar(250), GhiChu);
    request.input("NgayTongHop", mssql.SmallDateTime, NgayTongHop);

    await request.execute("sp_CapNhatLuongChiTiet");

    res.status(200).json({
      success: true,
      message: "Updated product quantity table information successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error when updating product quantity table information list.",
    });
  }
};
