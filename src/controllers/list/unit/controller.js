const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.getListUnitProducts = async (req, res) => {
  try {
    const result = await mssql.query("EXEC sp_LayDanhSachDVT");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when getting list of list unit information." });
  }
};

exports.postListUnitProduct = async (req, res) => {
  try {
    const { MaDVT, TenDVT, VietTat, GhiChu, TamNgung, Create_User } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("MaDVT", mssql.VarChar(15), MaDVT);
    request.input("TenDVT", mssql.NVarChar(150), TenDVT);
    request.input("VietTat", mssql.NVarChar(50), VietTat);
    request.input("GhiChu", mssql.NVarChar(150), GhiChu);
    request.input("TamNgung", mssql.Bit, TamNgung);
    request.input("Create_User", mssql.NVarChar(50), Create_User);

    await request.execute("sp_ThemDVT");

    res
      .status(201)
      .json({ message: "Added information of a successful list unit." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when adding information of a list unit." });
  }
};

exports.putListUnitProduct = async (req, res) => {
  try {
    const { DVT_ID, MaDVT, TenDVT, VietTat, GhiChu, TamNgung, Update_User } =
      req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("DVT_ID", mssql.Int, DVT_ID);
    request.input("MaDVT", mssql.VarChar(15), MaDVT);
    request.input("TenDVT", mssql.NVarChar(150), TenDVT);
    request.input("VietTat", mssql.NVarChar(50), VietTat);
    request.input("GhiChu", mssql.NVarChar(150), GhiChu);
    request.input("TamNgung", mssql.Bit, TamNgung);
    request.input("Update_User", mssql.NVarChar(50), Update_User);

    await request.execute("sp_CapNhatDVT");

    res
      .status(200)
      .json({ message: "Updated information of a successful list unit." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when updating information of a list unit." });
  }
};

exports.deleteListUnitProduct = async (req, res) => {
  try {
    const { DVT_ID } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("DVT_ID", mssql.Int, DVT_ID);

    await request.execute("sp_XoaDVT ");

    res
      .status(200)
      .json({ message: "Deleted information of a successful list unit." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when deleting information of a list unit." });
  }
};
