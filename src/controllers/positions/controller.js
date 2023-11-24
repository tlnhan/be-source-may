const mssql = require("mssql");
const mssqlConfig = require("../../db/mssql");

exports.getPositions = async (req, res) => {
  try {
    const result = await mssql.query("EXEC sp_LayDanhSachChucVu");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when getting list of position information." });
  }
};

exports.postPosition = async (req, res) => {
  try {
    const { ChucVu } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("ChucVu", mssql.NVarChar, ChucVu);

    await request.execute("sp_ThemChucVu");

    res
      .status(201)
      .json({ message: "Added information of a successful position." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when adding information of a position." });
  }
};

exports.putPosition = async (req, res) => {
  try {
    const { id, ChucVu } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);

    request.input("id", mssql.Int, id);
    request.input("ChucVu", mssql.NVarChar, ChucVu);

    await request.execute("sp_CapNhatChucVu");

    res
      .status(200)
      .json({ message: "Updated information of a successful position." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when updating information of a position." });
  }
};

exports.deletePosition = async (req, res) => {
  try {
    const { id } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("id", mssql.Int, id);

    await request.execute("sp_XoaChucVu");

    res
      .status(200)
      .json({ message: "Deleted information of a successful position." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when deleting information of a position." });
  }
};
