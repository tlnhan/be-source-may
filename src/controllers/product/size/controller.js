const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.getProductSizes = async (req, res) => {
  try {
    const result = await mssql.query("SELECT * FROM SanPham_Size");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when getting list of product size information." });
  }
};

exports.postProductSize = async (req, res) => {
  try {
    const { Size_Id, GhiChu, NgayTao, NguoiTao, NgayCapNhat, NguoiCapNhat } =
      req.body;

    const result = await mssql.query(
      `
                      INSERT INTO SanPham_Size (
                          [Size_Id],
                          [GhiChu],
                          [NgayTao],
                          [NguoiTao],
                          [NgayCapNhat],
                          [NguoiCapNhat]
                      ) VALUES (
                        '${Size_Id}',
                        '${GhiChu}',
                        '${NgayTao}',
                        N'${NguoiTao}',
                        '${NgayCapNhat}',
                        N'${NguoiCapNhat}'
                      )
                        `
    );

    res
      .status(200)
      .json({ message: "Added information of a successful product size." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when adding information of a product size." });
  }
};

exports.putProductSize = async (req, res) => {
  try {
    const { Size_Id, GhiChu, NgayTao, NguoiTao, NgayCapNhat, NguoiCapNhat } =
      req.body;

    const result = await mssql.query(
      `
                          UPDATE SanPham_Size
                          SET GhiChu = '${GhiChu}', 
                          NgayTao = '${NgayTao}', 
                          NguoiTao = N'${NguoiTao}',
                          NgayCapNhat = '${NgayCapNhat}',
                          NguoiCapNhat = N'${NguoiCapNhat}'
                          WHERE Size_Id = '${Size_Id}'
                      `
    );

    res
      .status(200)
      .json({ message: "Updated information of a successful product size." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when updating information of a product size." });
  }
};

exports.deleteProductSize = async (req, res) => {
  try {
    const { Size_Id } = req.body;
    await mssql.query(`DELETE FROM SanPham_Size WHERE Size_Id = '${Size_Id}'`);

    res
      .status(200)
      .json({ message: "Deleted information of a successful product size." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when deleting information of a product size." });
  }
};
