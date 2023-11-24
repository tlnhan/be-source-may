const mssql = require("mssql");
const mssqlConfig = require("../../db/mssql");

exports.getDepartments = async (req, res) => {
  try {
    const result = await mssql.query("EXEC sp_LayDanhSachBoPhan");
    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when getting list of department information." });
  }
};

exports.postDepartment = async (req, res) => {
  try {
    const { NguoiQuanLy, TenBP, SoDT } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("NguoiQuanLy", mssql.NVarChar, NguoiQuanLy);
    request.input("TenBP", mssql.NVarChar, TenBP);
    request.input("SoDT", mssql.VarChar, SoDT);

    await request.execute("sp_ThemBoPhan");

    res
      .status(200)
      .json({ message: "Added information of a successful department." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when adding information of a department." });
  }
};

exports.putDepartment = async (req, res) => {
  try {
    const { BoPhanID, NguoiQuanLy, TenBP, SoDT } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("BoPhanID", mssql.Int, BoPhanID);
    request.input("NguoiQuanLy", mssql.NVarChar, NguoiQuanLy);
    request.input("TenBP", mssql.NVarChar, TenBP);
    request.input("SoDT", mssql.VarChar, SoDT);

    await request.execute("sp_CapNhatBoPhan");

    res
      .status(200)
      .json({ message: "Updated information of a successful department." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when updating information of a department." });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const { BoPhanID } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("BoPhanID", mssql.Int, BoPhanID);

    await request.execute("sp_XoaBoPhan");

    res
      .status(200)
      .json({ message: "Deleted information of a successful department." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when deleting information of a department." });
  }
};
