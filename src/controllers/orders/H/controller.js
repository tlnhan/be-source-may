const mssql = require("mssql");
const mssqlConfig = require("../../../db/mssql");

exports.getOrderH = async (req, res) => {
  try {
    const result = await mssql.query("EXEC sp_LayDanhSachDonHang_H");
    const orders = result.recordset.map((orderH) => {
      const orderL = JSON.parse(orderH.DonHang_L);
      return {
        ...orderH,
        DonHang_L: orderL,
      };
    });
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when getting list of order H information." });
  }
};

exports.postOrderH = async (req, res) => {
  try {
    const {
      SoDH,
      KhachHang_ID,
      NguoiLap_ID,
      NgayLap,
      NgayYCGH,
      PhuongThucGH,
      GhiChu,
      NguoiTiepNhan,
      NgayTN,
      NgaySX,
      NgayBDGH,
      NgayKTGH,
      DienGiaiTN,
      NguoiTao,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("SoDH", mssql.VarChar, SoDH);
    request.input("KhachHang_ID", mssql.Int, KhachHang_ID);
    request.input("NguoiLap_ID", mssql.Int, NguoiLap_ID);
    request.input("NgayLap", mssql.SmallDateTime, NgayLap);
    request.input("NgayYCGH", mssql.SmallDateTime, NgayYCGH);
    request.input("PhuongThucGH", mssql.NVarChar, PhuongThucGH);
    request.input("GhiChu", mssql.NVarChar, GhiChu);
    request.input("NguoiTiepNhan", mssql.Int, NguoiTiepNhan);
    request.input("NgayTN", mssql.SmallDateTime, NgayTN);
    request.input("NgaySX", mssql.VarChar, NgaySX);
    request.input("NgayBDGH", mssql.VarChar, NgayBDGH);
    request.input("NgayKTGH", mssql.VarChar, NgayKTGH);
    request.input("DienGiaiTN", mssql.NVarChar, DienGiaiTN);
    request.input("NguoiTao", mssql.Int, NguoiTao);

    await request.execute("sp_ThemDonHangH");

    res
      .status(200)
      .json({ message: "Added information of a successful order H." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when adding information of a order H." });
  }
};

exports.putOrderH = async (req, res) => {
  try {
    const {
      DonHang_H,
      SoDH,
      KhachHang_ID,
      NguoiLap_ID,
      NgayYCGH,
      PhuongThucGH,
      GhiChu,
      NguoiTiepNhan,
      NgayTN,
      NgaySX,
      NgayBDGH,
      NgayKTGH,
      DienGiaiTN,
      NguoiCapNhat,
    } = req.body;

    const pool = await mssql.connect(mssqlConfig);
    const request = new mssql.Request(pool);

    request.input("DonHang_H", mssql.BigInt, DonHang_H);
    request.input("SoDH", mssql.VarChar, SoDH);
    request.input("KhachHang_ID", mssql.Int, KhachHang_ID);
    request.input("NguoiLap_ID", mssql.Int, NguoiLap_ID);
    request.input("NgayYCGH", mssql.SmallDateTime, NgayYCGH);
    request.input("PhuongThucGH", mssql.NVarChar, PhuongThucGH);
    request.input("GhiChu", mssql.NVarChar, GhiChu);
    request.input("NguoiTiepNhan", mssql.Int, NguoiTiepNhan);
    request.input("NgayTN", mssql.SmallDateTime, NgayTN);
    request.input("NgaySX", mssql.VarChar, NgaySX);
    request.input("NgayBDGH", mssql.VarChar, NgayBDGH);
    request.input("NgayKTGH", mssql.VarChar, NgayKTGH);
    request.input("DienGiaiTN", mssql.NVarChar, DienGiaiTN);
    request.input("NguoiCapNhat", mssql.Int, NguoiCapNhat);

    await request.execute("sp_CapNhatDonHangH");

    res
      .status(200)
      .json({ message: "Updated information of a successful order H." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when updating information of a order H." });
  }
};

exports.deleteOrderH = async (req, res) => {
  try {
    const { DonHang_H } = req.body;

    const pool = await mssql.connect(mssqlConfig);

    const request = new mssql.Request(pool);
    request.input("DonHang_H", mssql.BigInt, DonHang_H);

    await request.execute("sp_XoaDonHangH ");

    res
      .status(200)
      .json({ message: "Deleted information of a successful order H." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error when deleting information of a order H." });
  }
};
