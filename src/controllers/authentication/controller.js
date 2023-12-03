const mssql = require("mssql");
const mssqlConfig = require("../../db/mssql");
const jwt = require("jsonwebtoken");

exports.postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const pool = await mssql.connect(mssqlConfig);
    const result = await pool
      .request()
      .input("username", mssql.NVarChar, username)
      .input("password", mssql.NVarChar, password)
      .execute("sp_AuthenticateUser");

    result.recordset[0].AuthenticationStatus;
    const role = result.recordset[0].Role;
    const id = result.recordset[0].User_Id;

    if (
      result.recordset.length > 0 &&
      result.recordset[0].AuthenticationStatus === "Success"
    ) {
      const token = jwt.sign(
        { username, password, VaiTro: role, TaiKhoan_ID: id },
        process.env.SECRET_KEY
      );
      res.status(200).json({ token, role, id });
    } else {
      res.status(400).json({ message: "Username or password is incorrect." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Server error." });
  }
};
