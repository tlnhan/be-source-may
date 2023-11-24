const express = require("express");
const positionsController = require("../../controllers/positions/controller");

const router = express.Router();

router.get("/", positionsController.getPositions);
router.post("/", positionsController.postPosition);
router.put("/", positionsController.putPosition);
router.delete("/", positionsController.deletePosition);

module.exports = router;
