const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database");

router.get("/", async (req, res, next) => {
    try {
        const result = await mssql.query("EXEC sp_DSTongHopLuong");

        res.status(200).json(result.recordset);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ error: "Lỗi khi lấy danh sách" });
    }
});

router.post("/", async (req, res, next) => {
    try {
        const {
            SanLuongId,
            PhanCongId,
            NgaySanLuong,
            SoLuong,
            KhoaSanLuong,
            NguoiKhoaSanLuong,
            
        } = req.body;

        const pool = await mssql.connect(mssqlConfig);

        const request = new mssql.Request(pool);

        request.input("SanLuongId", mssql.BigInt, SanLuongId);
        request.input("PhanCongId", mssql.Int, PhanCongId);
        request.input("NgaySanLuong", mssql.Date, NgaySanLuong);
        request.input("SoLuong", mssql.Int, SoLuong);
        request.input("KhoaSanLuong", mssql.Bit, KhoaSanLuong);
        request.input("NguoiKhoaSanLuong", mssql.Int, NguoiKhoaSanLuong);
        await request.execute("sp_ThemTongHopLuong");

        res.status(200).json({ message: "Thêm thành công!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi khi thêm mới" });
    }
});

router.put("/", async (req, res, next) => {
    try {
        const {
            SanLuongId,
            PhanCongId,
            NgaySanLuong,
            ThoiGianSanLuong,
            SoLuong,
            KhoaSanLuong,
            NguoiKhoaSanLuong,
            
        } = req.body;

        const pool = await mssql.connect(mssqlConfig);

        const request = new mssql.Request(pool);

        request.input("SanLuongId", mssql.BigInt, SanLuongId);
        request.input("PhanCongId", mssql.Int, PhanCongId);
        request.input("NgaySanLuong", mssql.Date, NgaySanLuong);
        request.input("ThoiGianSanLuong", mssql.SmallDateTime, ThoiGianSanLuong);
        request.input("SoLuong", mssql.Int, SoLuong);
        request.input("KhoaSanLuong", mssql.Bit, KhoaSanLuong);
        request.input("NguoiKhoaSanLuong", mssql.Int, NguoiKhoaSanLuong);
        await request.execute("sp_CapNhatTongHopLuong");

        res.status(200).json({ message: "Cập nhật thành công!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi khi cập nhật sản lượng." });
    }
});

module.exports = router;