const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.getListProducts = async (req, res) => {
  try {
    const result = await mssql.query("EXEC sp_DanhSachSanPham");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when getting list of list product information." });
  }
};

exports.postListProduct = async (req, res) => {
  try {
    const { TenSP, Tentat, GhiChu, LoaiSP_ID, DVT_ID, TamNgung, Create_User } =
      req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("TenSP", mssql.NVarChar(255), TenSP);
    request.input("Tentat", mssql.NVarChar(255), Tentat);
    request.input("GhiChu", mssql.NVarChar(255), GhiChu);
    request.input("LoaiSP_ID", mssql.Int, LoaiSP_ID);
    request.input("DVT_ID", mssql.Int, DVT_ID);
    request.input("TamNgung", mssql.Bit, TamNgung);
    request.input("Create_User", mssql.NVarChar(255), Create_User);

    await request.execute("sp_ThemSanPham");

    res
      .status(200)
      .json({ message: "Added information of a successful list product." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when adding information of a list product." });
  }
};

exports.putListProduct = async (req, res) => {
  try {
    const {
      SanPham_ID,
      TenSP,
      Tentat,
      GhiChu,
      LoaiSP_ID,
      DVT_ID,
      TamNgung,
      Update_User,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("SanPham_ID", mssql.Int, SanPham_ID);
    request.input("TenSP", mssql.NVarChar(255), TenSP);
    request.input("Tentat", mssql.NVarChar(255), Tentat);
    request.input("GhiChu", mssql.NVarChar(255), GhiChu);
    request.input("LoaiSP_ID", mssql.Int, LoaiSP_ID);
    request.input("DVT_ID", mssql.Int, DVT_ID);
    request.input("TamNgung", mssql.Bit, TamNgung);
    request.input("Update_User", mssql.NVarChar(255), Update_User);

    await request.execute("sp_CapNhatSanPham");

    res
      .status(200)
      .json({ message: "Updated information of a successful list product." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when updating information of a list product." });
  }
};

exports.deleteListProduct = async (req, res) => {
  try {
    const { SanPham_ID } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("SanPham_ID", mssql.Int, SanPham_ID);

    await request.execute("sp_XoaSanPham");

    res
      .status(200)
      .json({ message: "Deleted information of a successful list product." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when deleting information of a list product." });
  }
};
