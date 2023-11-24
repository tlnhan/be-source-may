const mssql = require("mssql");
const mssqlConfig = require("../../../../db/mssql");

exports.getListTypeProducts = async (req, res) => {
  try {
    const result = await mssql.query("EXEC sp_DSLoai");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when getting list of type product information." });
  }
};

exports.postListTypeProduct = async (req, res) => {
  try {
    const { Ten, Tentat, GhiChu, ChungLoai_Id, NguoiTao } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("Ten", mssql.NVarChar(150), Ten);
    request.input("Tentat", mssql.NVarChar(50), Tentat);
    request.input("GhiChu", mssql.NVarChar(150), GhiChu);
    request.input("ChungLoai_Id", mssql.Int, ChungLoai_Id);
    request.input("NguoiTao", mssql.NVarChar(50), NguoiTao);

    await request.execute("sp_ThemLoai");

    res
      .status(201)
      .json({ message: "Added information of a successful type product." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when adding information of a type product." });
  }
};

exports.putListTypeProduct = async (req, res) => {
  try {
    const {
      Loai_ID,
      Ten,
      TenTat,
      GhiChu,
      ChungLoai_Id,
      NguoiCapNhat,
      TamNgung,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("Loai_Id", mssql.Int, Loai_ID);
    request.input("Ten", mssql.NVarChar(150), Ten);
    request.input("TenTat", mssql.NVarChar(50), TenTat);
    request.input("GhiChu", mssql.NVarChar(150), GhiChu);
    request.input("ChungLoai_Id", mssql.Int, ChungLoai_Id);
    request.input("NguoiCapNhat", mssql.NVarChar(50), NguoiCapNhat);
    request.input("TamNgung", mssql.Bit, TamNgung);

    await request.execute("sp_CapNhatLoai");

    res
      .status(200)
      .json({ message: "Updated information of a successful type product." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when updating information of a type product." });
  }
};

exports.deleteListTypeProduct = async (req, res) => {
  try {
    const { Loai_ID } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("Loai_Id", mssql.Int, Loai_ID);

    await request.execute("sp_XoaLoai");

    res
      .status(200)
      .json({ message: "Deleted information of a successful type product." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when deleting information of a type product." });
  }
};
