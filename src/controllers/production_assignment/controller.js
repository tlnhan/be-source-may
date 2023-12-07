const mssql = require("mssql");
const mssqlConfig = require("../../db/mssql");

exports.getProductionAssignments = async (req, res) => {
  try {
    const result = await mssql.query("EXEC sp_LayDanhSachPhanCongSanXuat");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when getting production assignment list." });
  }
};

exports.getDetailProductionAssignments = async (req, res) => {
  try {
    const {PhanCong_Id } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    const result = await request
      .input("PhanCong_Id", mssql.Int, PhanCong_Id)
      .execute("sp_ChiTietPhanCongSanXuat");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when getting detail production assignment list." });
  }
};

exports.postProductionAssignment = async (req, res) => {
  try {
    const {
      NhanVien_Id,
      DonHang_L,
      ChiTiet_Id,
      SoLuong,
      DonGia,
      DonGiaBoSung,
      GhiChu,
      NgayTao,
      NguoiTao,
      NgayCapNhat,
      NguoiCapNhat,
      HoanTat,
      NgayHoanTat,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("NhanVien_Id", mssql.Int, NhanVien_Id);
    request.input("DonHang_L", mssql.BigInt, DonHang_L);
    request.input("ChiTiet_Id", mssql.Int, ChiTiet_Id);
    request.input("SoLuong", mssql.Int, SoLuong);
    request.input("DonGia", mssql.Float, DonGia);
    request.input("DonGiaBoSung", mssql.Float, DonGiaBoSung);
    request.input("GhiChu", mssql.NVarChar(150), GhiChu);
    request.input("NgayTao", mssql.SmallDateTime, NgayTao);
    request.input("NguoiTao", mssql.NChar(10), NguoiTao);
    request.input("NgayCapNhat", mssql.SmallDateTime, NgayCapNhat);
    request.input("NguoiCapNhat", mssql.NChar(10), NguoiCapNhat);
    request.input("HoanTat", mssql.Bit, HoanTat);
    request.input("NgayHoanTat", mssql.SmallDateTime, NgayHoanTat);

    await request.execute("sp_ThemPhanCongSanXuat");

    res.status(201).json({
      message: "Added information of a successful production assignment.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error when adding information of a production assignment.",
    });
  }
};

exports.putProductionAssignment = async (req, res) => {
  try {
    const {
      PhanCong_Id,
      NhanVien_Id,
      DonHang_L,
      ChiTiet_Id,
      SoLuong,
      DonGia,
      DonGiaBoSung,
      GhiChu,
      NgayTao,
      NguoiTao,
      NgayCapNhat,
      NguoiCapNhat,
      HoanTat,
      NgayHoanTat,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("PhanCong_Id", mssql.BigInt, PhanCong_Id);
    request.input("NhanVien_Id", mssql.Int, NhanVien_Id);
    request.input("DonHang_L", mssql.BigInt, DonHang_L);
    request.input("ChiTiet_Id", mssql.Int, ChiTiet_Id);
    request.input("SoLuong", mssql.Int, SoLuong);
    request.input("DonGia", mssql.Float, DonGia);
    request.input("DonGiaBoSung", mssql.Float, DonGiaBoSung);
    request.input("GhiChu", mssql.NVarChar(150), GhiChu);
    request.input("NgayTao", mssql.SmallDateTime, NgayTao);
    request.input("NguoiTao", mssql.NChar(10), NguoiTao);
    request.input("NgayCapNhat", mssql.SmallDateTime, NgayCapNhat);
    request.input("NguoiCapNhat", mssql.NChar(10), NguoiCapNhat);
    request.input("HoanTat", mssql.Bit, HoanTat);
    request.input("NgayHoanTat", mssql.SmallDateTime, NgayHoanTat);

    await request.execute("sp_CapNhatPhanCongSanXuat");

    res.status(200).json({
      message: "Updated information of a successful production assignment.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error when updating information of a production assignment.",
    });
  }
};

exports.deleteProductionAssignment = async (req, res) => {
  try {
    const { PhanCong_Id } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("PhanCong_Id", mssql.BigInt, PhanCong_Id);

    await request.execute("sp_XoaPhanCongSanXuat ");

    res.status(200).json({
      message: "Deleted information of a successful production assignment.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error when deleting information of a production assignment.",
    });
  }
};
