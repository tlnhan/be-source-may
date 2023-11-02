const express = require("express");
const router = express.Router();
const mssql = require("mssql");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("EXEC sp_DSSize");

    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy danh sách size sản phẩm." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { TenSize, SizeCTy, NguoiTao } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("TenSize", mssql.NVarChar(255), TenSize);
    request.input("SizeCTy", mssql.Float, SizeCTy);
    request.input("NguoiTao", mssql.NVarChar(50), NguoiTao);

    await request.execute("sp_ThemSize");

    res
      .status(201)
      .json({ message: "Thêm kích thước sản phẩm mới thành công." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi thêm kích thước sản phẩm mới." });
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { SizeSP_Id, TenSize, SizeCTy, NguoiCapNhat } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("SizeSP_Id", mssql.Int, SizeSP_Id);
    request.input("TenSize", mssql.NVarChar(255), TenSize);
    request.input("SizeCTy", mssql.Float, SizeCTy);
    request.input("NguoiCapNhat", mssql.NVarChar(50), NguoiCapNhat);

    await request.execute("sp_CapNhatSize");

    res
      .status(200)
      .json({ message: "Cập nhật kích thước sản phẩm thành công." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi cập nhật kích thước sản phẩm." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { SizeSP_Id } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("SizeSP_Id", mssql.Int, SizeSP_Id);

    await request.execute("sp_XoaSize");

    res.status(200).json({ message: "Xóa kích thước sản phẩm thành công." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi xóa kích thước sản phẩm." });
  }
});

module.exports = router;
