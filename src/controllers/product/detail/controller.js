const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.getProductDetails = async (req, res) => {
  try {
    const result = await mssql.query("SELECT * FROM SanPham_ChiTiet");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when getting list of product detail information." });
  }
};

exports.postProductDetail = async (req, res) => {
  try {
    const {
      SanPham_Id,
      ChiTiet_ID,
      DonGia,
      NgayTao,
      NguoiTao,
      NgayCapNhat,
      NguoiCapNhat,
    } = req.body;

    const result = await mssql.query(
      `
                      INSERT INTO SanPham_ChiTiet (
                          [SanPham_Id],
                          [ChiTiet_ID],
                          [DonGia],
                          [NgayTao],
                          [NguoiTao],
                          [NgayCapNhat],
                          [NguoiCapNhat]
                      ) VALUES (
                        '${SanPham_Id}',
                        '${ChiTiet_ID}',
                        '${DonGia}',
                        '${NgayTao}',
                        N'${NguoiTao}',
                        '${NgayCapNhat}',
                        N'${NguoiCapNhat}'
                      )
                        `
    );

    res
      .status(200)
      .json({ message: "Added information of a successful product detail." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when adding information of a product detail." });
  }
};

exports.putProductDetail = async (req, res) => {
  try {
    const { ChiTiet_ID, DonGia, NgayTao, NguoiTao, NgayCapNhat, NguoiCapNhat } =
      req.body;

    const result = await mssql.query(
      `
                          UPDATE SanPham_ChiTiet
                          SET DonGia = '${DonGia}',
                          NgayTao = '${NgayTao}', 
                          NguoiTao = N'${NguoiTao}',
                          NgayCapNhat = '${NgayCapNhat}',
                          NguoiCapNhat = '${NguoiCapNhat}'
                          WHERE ChiTiet_ID = '${ChiTiet_ID}'
                      `
    );

    res
      .status(200)
      .json({ message: "Updated information of a successful product detail." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when updating information of a product detail." });
  }
};

exports.deleteProductDetail = async (req, res) => {
  try {
    const { ChiTiet_ID } = req.body;
    await mssql.query(
      `DELETE FROM SanPham_ChiTiet WHERE ChiTiet_ID = '${ChiTiet_ID}'`
    );

    res
      .status(200)
      .json({ message: "Deleted information of a successful product detail." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when deleting information of a product detail." });
  }
};
