const mssql = require("mssql");
const mssqlConfig = require("../../db/mssql");

exports.getCustomers = async (req, res) => {
  try {
    const result = await mssql.query("EXEC sp_LayDanhSachKhachHang");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when getting list of customer information." });
  }
};

exports.postCustomer = async (req, res) => {
  try {
    const {
      TenKhachHang,
      Tentat,
      DiaChi,
      SoDT,
      Fax,
      Masothue,
      NguoiDaiDien,
      NguoiLH,
      ThongTinLH,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("TenKhachHang", mssql.NVarChar, TenKhachHang);
    request.input("Tentat", mssql.NVarChar, Tentat);
    request.input("DiaChi", mssql.NVarChar, DiaChi);
    request.input("SoDT", mssql.VarChar, SoDT);
    request.input("Fax", mssql.VarChar, Fax);
    request.input("Masothue", mssql.VarChar, Masothue);
    request.input("NguoiDaiDien", mssql.NVarChar, NguoiDaiDien);
    request.input("NguoiLH", mssql.NVarChar, NguoiLH);
    request.input("ThongTinLH", mssql.NVarChar, ThongTinLH);

    await request.execute("sp_ThemKhachHang");

    res.status(201).json({ message: "Added information of a successful customer." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when adding information of a customer." });
  }
};

exports.putCustomer = async (req, res) => {
  try {
    const {
      MaKhachHang,
      TenKhachHang,
      Tentat,
      DiaChi,
      SoDT,
      Fax,
      Masothue,
      NguoiDaiDien,
      NguoiLH,
      ThongTinLH,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("MaKhachHang", mssql.VarChar, MaKhachHang);
    request.input("TenKhachHang", mssql.NVarChar, TenKhachHang);
    request.input("Tentat", mssql.NVarChar, Tentat);
    request.input("DiaChi", mssql.NVarChar, DiaChi);
    request.input("SoDT", mssql.VarChar, SoDT);
    request.input("Fax", mssql.VarChar, Fax);
    request.input("Masothue", mssql.VarChar, Masothue);
    request.input("NguoiDaiDien", mssql.NVarChar, NguoiDaiDien);
    request.input("NguoiLH", mssql.NVarChar, NguoiLH);
    request.input("ThongTinLH", mssql.NVarChar, ThongTinLH);

    await request.execute("sp_CapNhatKhachHang");

    res
      .status(200)
      .json({ message: "Updated information of a successful customer." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when updating information of a customer." });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const { MaKhachHang } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("MaKhachHang", mssql.VarChar, MaKhachHang);

    await request.execute("sp_XoaKhachHang");

    res.status(200).json({ message: "Deleted information of a successful customer." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when deleting information of a customer." });
  }
};
