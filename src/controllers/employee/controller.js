const mssql = require("mssql");
const mssqlConfig = require("../../db/mssql");

exports.getEmployees = async (req, res) => {
  try {
    const result = await mssql.query("EXEC sp_LayDanhSachNhanVien");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when getting list of employee information." });
  }
};

exports.postEmployee = async (req, res) => {
  try {
    const { BoPhanID, ChucVuID, HoTen, NgaySinh, Email, SoDT, NgayVaoLam } =
      req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("BoPhanID", mssql.Int, BoPhanID);
    request.input("ChucVuID", mssql.Int, ChucVuID);
    request.input("HoTen", mssql.NVarChar, HoTen);
    request.input("NgaySinh", mssql.Date, NgaySinh);
    request.input("Email", mssql.NVarChar, Email);
    request.input("SoDT", mssql.VarChar, SoDT);
    request.input("NgayVaoLam", mssql.Date, NgayVaoLam);

    await request.execute("sp_ThemNhanVien");

    res
      .status(200)
      .json({ message: "Added information of a successful employee." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when adding information of a employee." });
  }
};

exports.putEmployee = async (req, res) => {
  try {
    const {
      id,
      MaNV,
      BoPhanID,
      ChucVuID,
      HoTen,
      NgaySinh,
      Email,
      SoDT,
      NgayVaoLam,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("id", mssql.Int, id);
    request.input("MaNV", mssql.NVarChar, MaNV);
    request.input("BoPhanID", mssql.Int, BoPhanID);
    request.input("ChucVuID", mssql.Int, ChucVuID);
    request.input("HoTen", mssql.NVarChar, HoTen);
    request.input("NgaySinh", mssql.Date, NgaySinh);
    request.input("Email", mssql.NVarChar, Email);
    request.input("SoDT", mssql.VarChar, SoDT);
    request.input("NgayVaoLam", mssql.Date, NgayVaoLam);

    await request.execute("sp_CapNhatNhanVien");

    res
      .status(200)
      .json({ message: "Updated information of a successful employee." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when updating information of a employee." });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("id", mssql.Int, id);

    await request.execute("sp_XoaNhanVien");

    res
      .status(200)
      .json({ message: "Deleted information of a successful employee." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when deleting information of a employee." });
  }
};
