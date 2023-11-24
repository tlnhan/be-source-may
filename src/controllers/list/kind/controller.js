const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.getListKinds = async (req, res) => {
  try {
    const result = await mssql.query("SELECT * FROM DM_Loai");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when getting list of kind information." });
  }
};

exports.postListKind = async (req, res) => {
  try {
    const { Ten, TenTat, ChungLoai } = req.body;

    const result = await mssql.query(
      `
                INSERT INTO DM_Loai (
                    [Ten],
                    [TenTat],
                    [ChungLoai]
                ) VALUES (
                  N'${Ten}',
                  '${TenTat}',
                  N'${ChungLoai}'
                )
                  `
    );

    res.status(201).json({ message: "Added information of a successful list kind." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when adding information of a list kind." });
  }
};

exports.putListKind = async (req, res) => {
  try {
    const { Ten, TenTat, ChungLoai } = req.body;

    const result = await mssql.query(
      `
                      UPDATE DM_Loai
                      SET Ten = '${Ten}', 
                      TenTat = '${TenTat}', 
                      WHERE ChungLoai = '${ChungLoai}'
                  `
    );

    res
      .status(200)
      .json({ message: "Updated information of a successful list kind." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when updating information of a list kind." });
  }
};

exports.deleteListKind = async (req, res) => {
  try {
    const { ChungLoai } = req.body;
    await mssql.query(`DELETE FROM DM_Loai WHERE ChungLoai = '${ChungLoai}'`);

    res.status(200).json({ message: "Deleted information of a successful list kind." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when deleting information of a list kind." });
  }
};
