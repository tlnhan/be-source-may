const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const mssqlConfig = require("../../configs/database");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const pool = await mssql.connect(mssqlConfig);
    const result = await pool
      .request()
      .input("username", mssql.NVarChar, username)
      .input("password", mssql.NVarChar, password)
      .execute("sp_AuthenticateUser");

    const authenticationStatus = result.recordset[0].AuthenticationStatus;
    const role = result.recordset[0].Role;
    const id = result.recordset[0].User_Id;

    if (authenticationStatus === "Success") {
      const token = jwt.sign(
        { username, password, VaiTro: role, TaiKhoan_ID: id },
        dotenv.SECRET_KEY
      );
      res.status(200).json({ token, role, id });
    } else {
      res.status(400).json("Tên người dùng hoặc mật khẩu không đúng.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Lỗi máy chủ." });
  }
});

module.exports = router;
