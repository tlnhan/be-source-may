const mssql = require("mssql");
const mssqlConfig = require("../../../../db/mssql");

exports.getListKindProducts = async (req, res) => {
  try {
    const result = await mssql.query("SELECT * FROM DM_ChungLoaiSP");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when getting list of kind product information." });
  }
};

exports.postListKindProduct = async (req, res) => {
  try {
    const {
      Ma,
      Ten,
      KyHieu,
      Tentat,
      GhiChu,
      TamNgung,
      Createdate,
      Create_User,
      Update_Date,
      Update_User,
    } = req.body;

    const result = await mssql.query(
      `
                  INSERT INTO DM_ChungLoaiSP (
                      [Ma],
                      [Ten],
                      [KyHieu],
                      [Tentat],
                      [GhiChu],
                      [TamNgung],
                      [Createdate],
                      [Create_User],
                      [Update_Date],
                      [Update_User]
                  ) VALUES (
                    '${Ma}',
                    N'${Ten}',
                    '${KyHieu}',
                    '${Tentat}',
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
      .json({ message: "Added information of a successful kind product." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when adding information of a kind product." });
  }
};

exports.putListKindProduct = async (req, res) => {
  try {
    const {
      Ma,
      Ten,
      KyHieu,
      Tentat,
      GhiChu,
      TamNgung,
      Createdate,
      Create_User,
      Update_Date,
      Update_User,
    } = req.body;

    const result = await mssql.query(
      `
                        UPDATE DM_ChungLoaiSP
                        SET Ten = '${Ten}', 
                        KyHieu = '${KyHieu}', 
                        Tentat = '${Tentat}', 
                        GhiChu = '${GhiChu}', 
                        TamNgung = '${TamNgung}', 
                        Createdate = '${Createdate}', 
                        Create_User = N'${Create_User}', 
                        Update_Date = '${Update_Date}', 
                        Update_User = '${Update_User}',
                        WHERE Ma = '${Ma}'
                    `
    );

    res
      .status(200)
      .json({ message: "Updated information of a successful kind product." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when updating information of a kind product." });
  }
};

exports.deleteListKindProduct = async (req, res) => {
  try {
    const { Ma } = req.body;
    await mssql.query(`DELETE FROM DM_ChungLoaiSP WHERE Ma = '${Ma}'`);

    res
      .status(200)
      .json({ message: "Deleted information of a successful kind product." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when deleting information of a kind product." });
  }
};
