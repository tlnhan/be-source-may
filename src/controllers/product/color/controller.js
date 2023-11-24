const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.getProductColors = async (req, res) => {
  try {
    const result = await mssql.query("SELECT * FROM SanPham_Mau");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when getting list of product color information." });
  }
};

exports.postProductColor = async (req, res) => {
  try {
    const {
      SanPham_Id,
      MauSP_Id,
      GhiChu,
      NgayTao,
      NguoiTao,
      NgayCapNhat,
      NguoiCapNhat,
    } = req.body;

    const result = await mssql.query(
      `
                      INSERT INTO SanPham_Mau (
                          [SanPham_Id],
                          [MauSP_Id],
                          [GhiChu],
                          [NgayTao],
                          [NguoiTao],
                          [NgayCapNhat],
                          [NguoiCapNhat]
                      ) VALUES (
                        '${SanPham_Id}',
                        '${MauSP_Id}',
                        '${GhiChu}',
                        N'${NgayTao}',
                        '${NguoiTao}',
                        '${NgayCapNhat}',
                        N'${NguoiCapNhat}'
                      )
                        `
    );

    res
      .status(200)
      .json({ message: "Added information of a successful product color." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when adding information of a product color." });
  }
};

exports.putProductColor = async (req, res) => {
  try {
    const { MauSP_Id, GhiChu, NgayTao, NguoiTao, NgayCapNhat, NguoiCapNhat } =
      req.body;

    const result = await mssql.query(
      `
                      UPDATE SanPham_Mau
                      SET GhiChu = '${GhiChu}', 
                      NgayTao = '${NgayTao}', 
                      NguoiTao = N'${NguoiTao}',
                      NgayCapNhat = '${NgayCapNhat}',
                      NguoiCapNhat = '${NguoiCapNhat}'
                      WHERE MauSP_Id = '${MauSP_Id}'
                  `
    );

    res
      .status(200)
      .json({ message: "Updated information of a successful product color." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when updating information of a product color." });
  }
};

exports.deleteProductColor = async (req, res) => {
  try {
    const { MauSP_Id } = req.body;
    await mssql.query(`DELETE FROM SanPham_Mau WHERE MauSP_Id = '${MauSP_Id}'`);

    res
      .status(200)
      .json({ message: "Deleted information of a successful product color." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when deleting information of a product color." });
  }
};
