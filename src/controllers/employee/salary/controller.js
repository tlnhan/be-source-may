const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.getSalaryEmployees = async (req, res) => {
  try {
    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    const result = await request.execute("sp_TinhLuongNhanVien");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error: "Error when getting list of salary employee information.",
      });
  }
};

exports.insertDataToSalaryEmployees = async (req, res) => {
  try {
    const { Thang, Nam, SanLuongTuNgay, SanLuongDenNgay, User_Id } = req.body;
    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("Thang", mssql.TinyInt, Thang);
    request.input("Nam", mssql.TinyInt, Nam);
    request.input("SanLuongTuNgay", mssql.Date, SanLuongTuNgay);
    request.input("SanLuongDenNgay", mssql.Date, SanLuongDenNgay);
    request.input("User_Id", mssql.Int, User_Id);

    await request.execute("sp_DoBangLuongSanPham_TheoCapNhatSanLuong");
    res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error: "Error. Try again",
      });
  }
};
