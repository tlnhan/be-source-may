const express = require("express");
const OAAPSController = require("../../../controllers/statiѕtic/o.a.a.p.s/controller");

const router = express.Router();

router.post("/", OAAPSController.getOAAPSStatistic);

module.exports = router;
