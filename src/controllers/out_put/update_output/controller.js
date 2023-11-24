const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.getUpdateOutputs = async (req, res) => {
  try {
    const result = await mssql.query("EXEC sp_LayDanhSachCapNhatSanLuong");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when getting update output list." });
  }
};

exports.postUpdateOutput = async (req, res) => {
  try {
    const {
      PhanCong_Id,
      NgaySanLuong,
      ThoiGianSanLuong,
      SoLuong,
      KhoaSanLuong,
      NgayKhoaSanLuong,
      NguoiKhoaSanLuong,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("PhanCong_Id", mssql.NChar(10), PhanCong_Id);
    request.input("NgaySanLuong", mssql.Date, NgaySanLuong);
    request.input("ThoiGianSanLuong", mssql.SmallDateTime, ThoiGianSanLuong);
    request.input("SoLuong", mssql.Int, SoLuong);
    request.input("KhoaSanLuong", mssql.Bit, KhoaSanLuong);
    request.input("NgayKhoaSanLuong", mssql.SmallDateTime, NgayKhoaSanLuong);
    request.input("NguoiKhoaSanLuong", mssql.Int, NguoiKhoaSanLuong);

    await request.execute("sp_ThemCapNhatSanLuong");

    res.status(201).json({
      message: "Added information of a successful update output.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error when adding information of a update output.",
    });
  }
};

exports.putUpdateOutput = async (req, res) => {
  try {
    const {
      SanLuong_Id,
      PhanCong_Id,
      NgaySanLuong,
      ThoiGianSanLuong,
      SoLuong,
      KhoaSanLuong,
      NgayKhoaSanLuong,
      NguoiKhoaSanLuong,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("SanLuong_Id", mssql.BigInt, SanLuong_Id);
    request.input("PhanCong_Id", mssql.NChar(10), PhanCong_Id);
    request.input("NgaySanLuong", mssql.Date, NgaySanLuong);
    request.input("ThoiGianSanLuong", mssql.SmallDateTime, ThoiGianSanLuong);
    request.input("SoLuong", mssql.Int, SoLuong);
    request.input("KhoaSanLuong", mssql.Bit, KhoaSanLuong);
    request.input("NgayKhoaSanLuong", mssql.SmallDateTime, NgayKhoaSanLuong);
    request.input("NguoiKhoaSanLuong", mssql.Int, NguoiKhoaSanLuong);

    await request.execute("sp_CapNhatCapNhatSanLuong");

    res.status(200).json({
      message: "Updated information of a successful update output.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error when updating information of a update output.",
    });
  }
};

exports.deleteUpdateOutput = async (req, res) => {
  try {
    const { SanLuong_Id } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("SanLuong_Id", mssql.BigInt, SanLuong_Id);

    await request.execute("sp_XoaCapNhatSanLuong ");

    res.status(200).json({
      message: "Deleted information of a successful update output.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error when deleting information of a update output.",
    });
  }
};
