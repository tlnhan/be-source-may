const express = require("express");
const router = express.Router();
const mssql = require("mssql");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("SELECT * FROM DonHang_H");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while getting order-H." });
  }
});

router.post("/", async (req, res, next) => {
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
      NgayTao,
      NguoiTao,
      NgayCapNhat,
      NguoiCapNhat,
      DongDonHang,
      NguoiDong,
      NgayDong,
    } = req.body;

    const result = await mssql.query(
      `
                INSERT INTO DonHang_H (
                    [SoDH],
                    [KhachHang_ID],
                    [NguoiLap_ID],
                    [NgayLap],
                    [NgayYCGH],
                    [PhuongThucGH],
                    [GhiChu],
                    [NguoiTiepNhan],
                    [NgayTN],
                    [NgaySX],
                    [NgayBDGH],
                    [NgayKTGH],
                    [DienGiaiTN],
                    [NgayTao],
                    [NguoiTao],
                    [NgayCapNhat],
                    [NguoiCapNhat],
                    [DongDonHang],
                    [NguoiDong],
                    [NgayDong]
                ) VALUES (
                  '${SoDH}',
                  '${KhachHang_ID}',
                  '${NguoiLap_ID}',
                  '${NgayLap}',
                  '${NgayYCGH}',
                  N'${PhuongThucGH}',
                  N'${GhiChu}',
                  N'${NguoiTiepNhan}',
                  '${NgayTN}',
                  '${NgaySX}',
                  '${NgayBDGH}',
                  '${NgayKTGH}',
                  N'${DienGiaiTN}',
                  '${NgayTao}',
                  N'${NguoiTao}',
                  '${NgayCapNhat}',
                  N'${NguoiCapNhat}',
                  '${DongDonHang}',
                  N'${NguoiDong}',
                  '${NgayDong}'
                )
                  `
    );
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while adding order-H." });
  }
});

router.put("/", async (req, res, next) => {
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
      NgayTao,
      NguoiTao,
      NgayCapNhat,
      NguoiCapNhat,
      DongDonHang,
      NguoiDong,
      NgayDong,
    } = req.body;

    const result = await mssql.query(
      `
                      UPDATE DonHang_H
                      SET KhachHang_ID = '${KhachHang_ID}', 
                      NguoiLap_ID = '${NguoiLap_ID}', 
                      NgayLap = '${NgayLap}', 
                      NgayYCGH = '${NgayYCGH}', 
                      PhuongThucGH = '${PhuongThucGH}', 
                      GhiChu = N'${GhiChu}', 
                      NguoiTiepNhan = '${NguoiTiepNhan}', 
                      NgayTN = '${NgayTN}', 
                      NgaySX = '${NgaySX}',
                      NgayBDGH = '${NgayBDGH}',
                      NgayKTGH = '${NgayKTGH}',
                      DienGiaiTN = '${DienGiaiTN}',
                      NgayTao = '${NgayTao}',
                      NguoiTao = '${NguoiTao}',
                      NgayCapNhat = '${NgayCapNhat}',
                      NguoiCapNhat = '${NguoiCapNhat}',
                      DongDonHang = '${DongDonHang}',
                      NguoiDong = '${NguoiDong}',
                      NgayDong = '${NgayDong}',
                      WHERE SoDH = '${SoDH}'
                  `
    );
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while updating order-H." });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { SoDH } = req.body;
    await mssql.query(`DELETE FROM DonHang_H WHERE SoDH = '${SoDH}'`);
    res.status(200).json({
      message: `The order-H with SoDH: ${SoDH} has been deleted.`,
    });
  } catch (error) {
    res.status(500).json({ error: "Error while deleting order-H." });
  }
});

module.exports = router;
