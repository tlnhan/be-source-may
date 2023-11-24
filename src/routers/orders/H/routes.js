const express = require("express");
const orderHController = require("../../../controllers/orders/H/controller");

const router = express.Router();

router.get("/", orderHController.getOrderH);
router.post("/", orderHController.postOrderH);
router.put("/", orderHController.putOrderH);
router.delete("/", orderHController.deleteOrderH);

module.exports = router;
