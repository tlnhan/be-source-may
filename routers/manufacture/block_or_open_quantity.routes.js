const express = require("express");
const router = express.Router();
const mssql = require("mssql");

router.get("/", async (req, res, next) => {});

router.post("/", async (req, res, next) => {
    try {
        const { action, ngaysanluong, PhanCong_Id, User_Id } = req.body;

        const pool = await mssql.connect(mssqlCon);
        const request = new mssql.Request(pool);

        request.input("action", mssql.NVarChar(50), action);
        request.input("ngaysanluong", mssql.Date, ngaysanluong);
        request.input("PhanCong_Id", mssql.Int, PhanCong_Id);
        request.input("User_Id", mssql.NChar(10), User_Id);

        const result = await request.execute("sp_KhoaCapNhatSanLuong");

        res.status(200).json({ message: "Thao tác sản lượng thành công." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Thao tác sản lượng thất bại." });
    }
});

router.put("/", async (req, res, next) => {});

router.delete("/", async (req, res, next) => {});

module.exports = router;
