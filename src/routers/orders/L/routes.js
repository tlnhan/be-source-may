const express = require("express");
const orderLController = require("../../../controllers/orders/L/controller");

const router = express.Router();

router.get("/", orderLController.getOrderLs);
router.post("/", orderLController.postOrderL);
router.put("/", orderLController.putOrderL);
router.delete("/", orderLController.deleteOrderL);

module.exports = router;
