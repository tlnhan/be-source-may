const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.getProductQuantityTables = async (req, res) => {
  try {
    const result = await mssql.query("EXEC sp_LayDanhSachBangLuongSanPham");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when getting list of product quantity table information." });
  }
};

exports.postProductQuantityTable = async (req, res) => {
  try {
    const {
      Thang,
      Nam,
      NhanVien_ID,
      DonHang_L,
      ChiTiet_Id,
      SoLuong,
      DonGia,
      DonGiaBoSung,
      GhiChu,
      NgayTongHop,
      ThoiGianTongHop,
      NguoiTao,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("Thang", mssql.TinyInt, Thang);
    request.input("Nam", mssql.SmallInt, Nam);
    request.input("NhanVien_ID", mssql.Int, NhanVien_ID);
    request.input("DonHang_L", mssql.Int, DonHang_L);
    request.input("ChiTiet_Id", mssql.Int, ChiTiet_Id);
    request.input("SoLuong", mssql.Int, SoLuong);
    request.input("DonGia", mssql.Float, DonGia);
    request.input("DonGiaBoSung", mssql.Float, DonGiaBoSung);
    request.input("GhiChu", mssql.NVarChar(250), GhiChu);
    request.input("NgayTongHop", mssql.SmallDateTime, NgayTongHop);
    request.input("ThoiGianTongHop", mssql.SmallDateTime, ThoiGianTongHop);
    request.input("NguoiTao", mssql.Int, NguoiTao);

    await request.execute("sp_ThemBangLuongSanPham");

    res
      .status(200)
      .json({ message: "Added information of a successful product quantity table." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when adding information of a product quantity table." });
  }
};

exports.putProductQuantityTable = async (req, res) => {
  try {
    const {
      Luong_ID,
      Thang,
      Nam,
      NhanVien_ID,
      DonHang_L,
      ChiTiet_Id,
      SoLuong,
      DonGia,
      DonGiaBoSung,
      GhiChu,
      NgayTongHop,
      ThoiGianTongHop,
      NguoiTao,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("Luong_ID", mssql.Int, Luong_ID);
    request.input("Thang", mssql.TinyInt, Thang);
    request.input("Nam", mssql.SmallInt, Nam);
    request.input("NhanVien_ID", mssql.Int, NhanVien_ID);
    request.input("DonHang_L", mssql.Int, DonHang_L);
    request.input("ChiTiet_Id", mssql.Int, ChiTiet_Id);
    request.input("SoLuong", mssql.Int, SoLuong);
    request.input("DonGia", mssql.Float, DonGia);
    request.input("DonGiaBoSung", mssql.Float, DonGiaBoSung);
    request.input("GhiChu", mssql.NVarChar(250), GhiChu);
    request.input("NgayTongHop", mssql.SmallDateTime, NgayTongHop);
    request.input("ThoiGianTongHop", mssql.SmallDateTime, ThoiGianTongHop);
    request.input("NguoiTao", mssql.Int, NguoiTao);

    await request.execute("sp_CapNhatBangLuongSanPham");

    res
      .status(200)
      .json({ message: "Updated information of a successful product quantity table." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when updating information of a product quantity table." });
  }
};

exports.deleteProductQuantityTable = async (req, res) => {
  try {
    const { Luong_ID } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("Luong_ID", mssql.Int, Luong_ID);

    await request.execute("sp_XoaBangLuongSanPham ");

    res
      .status(200)
      .json({ message: "Deleted information of a successful product quantity table." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when deleting information of a product quantity table." });
  }
};
