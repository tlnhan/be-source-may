const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.getListDetails = async (req, res) => {
  try {
    const result = await mssql.query("SELECT * FROM DM_ChiTiet");
    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when getting list of detail information." });
  }
};

exports.postListDetail = async (req, res) => {
  try {
    const {
      MaChiTiet,
      TenChiTiet,
      VietTat,
      GhiChu,
      TamNgung,
      Createdate,
      Create_User,
      Update_Date,
      Update_User,
    } = req.body;

    const result = await mssql.query(
      `
            INSERT INTO DM_ChiTiet (
              [MaChiTiet],
              [TenChiTiet],
              [VietTat],
              [GhiChu],
              [TamNgung],
              [Createdate],
              [Create_User],
              [Update_Date],
              [Update_User]
            ) VALUES (
              '${MaChiTiet}',
              N'${TenChiTiet}',
              '${VietTat}',
              N'${GhiChu}',
              '${TamNgung}',
              '${Createdate}',
              N'${Create_User}',
              '${Update_Date}',
              N'${Update_User}'
            )
              `
    );

    res
      .status(201)
      .json({ message: "Added information of a successful list detail." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when adding information of a list detail." });
  }
};

exports.putListDetail = async (req, res) => {
  try {
    const {
      MaChiTiet,
      TenChiTiet,
      VietTat,
      GhiChu,
      TamNgung,
      Createdate,
      Create_User,
      Update_Date,
      Update_User,
    } = req.body;

    const result = await mssql.query(
      `
                  UPDATE DM_ChiTiet
                  SET TenChiTiet = '${TenChiTiet}', 
                  VietTat = '${VietTat}', 
                  GhiChu = '${GhiChu}', 
                  TamNgung = '${TamNgung}', 
                  Createdate = '${Createdate}', 
                  Create_User = '${Create_User}', 
                  Update_Date = N'${Update_Date}', 
                  Update_User = '${Update_User}', 
                  WHERE MaChiTiet = '${MaChiTiet}'
              `
    );

    res
      .status(200)
      .json({ message: "Updated information of a successful list detail." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when updating information of a list detail." });
  }
};

exports.deleteListDetail = async (req, res) => {
  try {
    const { ChiTiet_ID } = req.body;
    await mssql.query(
      `DELETE FROM DM_ChiTiet WHERE ChiTiet_ID = '${ChiTiet_ID}'`
    );

    res
      .status(200)
      .json({ message: "Deleted information of a successful list detail." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when deleting information of a list detail." });
  }
};
