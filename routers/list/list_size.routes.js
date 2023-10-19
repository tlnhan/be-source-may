const express = require("express");
const router = express.Router();
const mssql = require("mssql");

router.get("/", async (req, res, next) => {
  try {
    await mssql.query("SELECT * FROM DM_Size");
    res
      .status(200)
      .json({ message: "The list-size has been gotten successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error while getting list-size." });
  }
});

router.post("/", async (req, res, next) => {});

router.put("/", async (req, res, next) => {});

router.delete("/", async (req, res, next) => {});

module.exports = router;
