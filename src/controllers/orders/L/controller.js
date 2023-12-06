const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.getOrderLs = async (req, res) => {
  try {
    const result = await mssql.query("EXEC sp_LayDanhSachDonHang_L");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when getting list of order L information." });
  }
};

exports.postOrderL = async (req, res) => {
  try {
    const {
      DonHang_H,
      SanPham_Id,
      MauSP_Id,
      Size_Id,
      SoLuong,
      NgayYCGH,
      GhiChu,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("DonHang_H", mssql.Int, DonHang_H);
    request.input("SanPham_Id", mssql.Int, SanPham_Id);
    request.input("MauSP_Id", mssql.Int, MauSP_Id);
    request.input("Size_Id", mssql.Int, Size_Id);
    request.input("SoLuong", mssql.Int, SoLuong);
    request.input("NgayYCGH", mssql.VarChar(10), NgayYCGH);
    request.input("GhiChu", mssql.NVarChar(200), GhiChu);

    await request.execute("sp_ThemDonHang_L");

    res
      .status(200)
      .json({ message: "Added information of a successful order L." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when adding information of a order L." });
  }
};

exports.putOrderL = async (req, res) => {
  try {
    const {
      DonHang_L,
      DonHang_H,
      SanPham_Id,
      MauSP_Id,
      Size_Id,
      SoLuong,
      NgayYCGH,
      GhiChu,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("DonHang_L", mssql.Int, DonHang_L);
    request.input("DonHang_H", mssql.Int, DonHang_H);
    request.input("SanPham_Id", mssql.Int, SanPham_Id);
    request.input("MauSP_Id", mssql.Int, MauSP_Id);
    request.input("Size_Id", mssql.Int, Size_Id);
    request.input("SoLuong", mssql.Int, SoLuong);
    request.input("NgayYCGH", mssql.VarChar(10), NgayYCGH);
    request.input("GhiChu", mssql.NVarChar(200), GhiChu);

    await request.execute("sp_CapNhatDonHang_L");

    res
      .status(200)
      .json({ message: "Updated information of a successful order L." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when updating information of a order L." });
  }
};

exports.deleteOrderL = async (req, res) => {
  try {
    const { DonHang_L } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("DonHang_L", mssql.Int, DonHang_L);

    await request.execute("sp_XoaDonHang_L ");

    res
      .status(200)
      .json({ message: "Deleted information of a successful order L." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when deleting information of a order L." });
  }
};
