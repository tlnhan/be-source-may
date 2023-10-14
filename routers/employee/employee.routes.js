const express = require("express");
const router = express.Router();
const mssql = require("mssql");

router.get("/", async (req, res, next) => {
  try {
    const result = await mssql.query("SELECT * FROM NhanVien");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error while getting employees." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      MaNV,
      BoPhanID,
      ChucVuID,
      HoTen,
      NgaySinh,
      Email,
      SoDT,
      NgayVaoLam,
      NgayCapNhat,
    } = req.body;

    await mssql.query(
      `
          INSERT INTO NhanVien (
            [MaNV],
            [BoPhanID],
            [ChucVuID],
            [HoTen],
            [NgaySinh],
            [Email],
            [SoDT],
            [NgayVaoLam],
            [NgayCapNhat]
          ) VALUES (
            '${MaNV}',
            '${BoPhanID}',
            '${ChucVuID}',
            N'${HoTen}',
            '${NgaySinh}',
            '${Email}',
            '${SoDT}',
            '${NgayVaoLam}',
            '${NgayCapNhat}',
          )
            `
    );
    res
      .status(200)
      .json({ message: "The employee has been added successfully ." });
  } catch (error) {
    res.status(500).json({ error: "Error while adding employee." });
  }
});

router.put("/", async (req, res, next) => {
    try {
        const {
            MaNV,
            BoPhanID,
            ChucVuID,
            HoTen,
            NgaySinh,
            Email,
            SoDT,
            NgayVaoLam,
            NgayCapNhat,
          } = req.body;
    
        await mssql.query(
          `
                UPDATE NhanVien
                SET BoPhanID = '${BoPhanID}', 
                ChucVuID = '${ChucVuID}', 
                HoTen = '${HoTen}', 
                NgaySinh = '${NgaySinh}', 
                EMail = '${Email}', 
                SoDT = '${SoDT}', 
                NgayVaoLam = '${NgayVaoLam}', 
                NgayCapNhat = '${NgayCapNhat}' 
                WHERE MaNV = '${MaNV}'
            `,
        );
        res.status(200).json({ message: "The employee has been updated." });
      } catch (error) {
        res.status(500).json({ error: "Error while updating employee." });
      }
});

router.delete("/", async (req, res, next) => {
    try {
        const MaNV = req.body;
        await mssql.query(`DELETE FROM NhanVien WHERE MaNV = ${MaNV}`);
        res.status(200).json({ message: "The employee has been deleted." });
    } catch (error) {
        res.status(500).json({ error: 'Error while deleting employee.' });
    }
});

module.exports = router;
