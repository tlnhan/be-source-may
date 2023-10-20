const express = require("express");
const router = express.Router();
const mssql = require("mssql");

router.get("/", async (req, res, next) => {
    try {
        const result = await mssql.query("SELECT * FROM DM_KhachHang");
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: "Error while getting customers." });
    }
});

router.post("/", async (req, res, next) => {
    try {
        const {
          Ma_Auto,
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
          TamNgung,
        } = req.body;
    
        await mssql.query(
          `
          INSERT INTO DM_KhachHang (
            [Ma_Auto],
            [MaKhachHang],
            [TenKhachHang],
            [Tentat],
            [DiaChi],
            [SoDT],
            [Fax],
            [Masothue],
            [NguoiDaiDien],
            [NguoiLH],
            [ThongTinLH],
            [TamNgung]
          ) VALUES (
            '${Ma_Auto}',
            '${MaKhachHang}',
            N'${TenKhachHang}',
            N'${Tentat}',
            N'${DiaChi}',
            '${SoDT}',
            '${Fax}',
            '${Masothue}',
            N'${NguoiDaiDien}',
            N'${NguoiLH}',
            N'${ThongTinLH}',
            '${TamNgung}'
          )
            `,
        );
        res.status(200).json({ message: "The customer has been added successfully ." });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error while adding customer." });
      }
});

router.put("/", async (req, res, next) => {
  try {
    const {
      Ma_Auto,
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
      TamNgung,
    } = req.body;

    await mssql.query(
      `
            UPDATE DM_KhachHang
            SET Ma_Auto = '${Ma_Auto}', 
            TenKhachHang = N'${TenKhachHang}', 
            Tentat = N'${Tentat}', 
            DiaChi = N'${DiaChi}', 
            SoDT = '${SoDT}', 
            Fax = '${Fax}', 
            Masothue = '${Masothue}', 
            NguoiDaiDien = N'${NguoiDaiDien}', 
            NguoiLH = N'${NguoiLH}', 
            ThongTinLH = N'${ThongTinLH}', 
            TamNgung = '${TamNgung}'
            WHERE MaKhachHang = '${MaKhachHang}'
        `,
    );
    res.status(200).json({ message: "The customer has been updated." });
  } catch (error) {
    res.status(500).json({ error: "Error while updating customer." });
  }
});

router.delete("/", async (req, res, next) => {
    try {
        const MaKhachHang = req.body;
        await mssql.query(`DELETE FROM DM_KhachHang WHERE MaKhachHang = '${MaKhachHang}'`);
        res.status(200).json({ message: "The customer has been deleted." });
    } catch (error) {
        res.status(500).json({ error: 'Error while deleting customer.' });
    }
});

module.exports = router;