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
            PhanCong_Id,
            SoLuong,     
        } = req.body;

        const pool = await mssql.connect(mssqlConfig);
        const request = new mssql.Request(pool);
        const requestCheck = new mssql.Request(pool);
        requestCheck.input("PhanCongId", mssql.Int, PhanCong_Id);
        const result = await requestCheck.query("SELECT SoLuong FROM PhanCongSanXuat WHERE PhanCong_Id = @PhanCongId");
        const allocatedQuantity = result.recordset[0].SoLuong;      

        if (SoLuong > allocatedQuantity) {
            return res.status(400).json({ error: "Số lượng cập nhật không thể lớn hơn số lượng phân công." });
        }   
      
        request.input("PhanCongId", mssql.Int, PhanCong_Id);
        request.input("SoLuong", mssql.Int, SoLuong);
        await request.execute("sp_ThemTongHopLuong");
       
        res.status(200).json({ message: "Thêm thành công!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Xảy ra lỗi khi thêm mới" });
    }
});

router.put("/", async (req, res, next) => {
    try {
        const {
            SanLuong_Id,
            PhanCong_Id,
            SoLuong,           
        } = req.body;

        const pool = await mssql.connect(mssqlConfig);
        const request = new mssql.Request(pool);
        const requestCheck = new mssql.Request(pool);
        requestCheck.input("PhanCongId", mssql.Int, PhanCong_Id);
        const result = await requestCheck.query("SELECT SoLuong FROM PhanCongSanXuat WHERE PhanCong_Id = @PhanCongId");
        const allocatedQuantity = result.recordset[0].SoLuong;

        if (SoLuong > allocatedQuantity) {
            return res.status(400).json({ error: "Số lượng cập nhật không thể lớn hơn số lượng phân công." });
        }   


        request.input("SanLuongId", mssql.BigInt, SanLuong_Id);
        request.input("PhanCongId", mssql.Int, PhanCong_Id);
        request.input("SoLuong", mssql.Int, SoLuong);
        await request.execute("sp_CapNhatTongHopLuong");

        res.status(200).json({ message: "Cập nhật thành công!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi khi cập nhật sản lượng." });
    }
});

module.exports = router;