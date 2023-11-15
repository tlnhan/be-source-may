const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database"); 

router.post("/", async (req, res, next) => {
    try {
        const { Action, PhanCong_Id, User_Id } = req.body;

        const pool = await mssql.connect(mssqlConfig);
        const request = new mssql.Request(pool);

        request.input("Action", mssql.NVarChar(50), Action);
        request.input("PhanCong_Id", mssql.Int, PhanCong_Id);
        request.input("User_Id", mssql.NChar(10), User_Id);

        await request.execute("sp_KhoaCapNhatSanLuong");

        res.status(200).json({ message: "Thao tác sản lượng thành công." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Thao tác sản lượng thất bại." });
    }
});

module.exports = router;
