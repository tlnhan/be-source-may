const express = require("express");
const aggregateOutputController = require("../../../controllers/out_put/aggregate_output/controller");

const router = express.Router();

router.get("/", aggregateOutputController.getAggregateOutputs);

module.exports = router;
