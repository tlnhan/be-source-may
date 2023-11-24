const express = require("express");
const productQuantityTableController = require("../../../controllers/quantity/product_quantity_table/controller");

const router = express.Router();

router.get("/", productQuantityTableController.getProductQuantityTables);
router.post("/", productQuantityTableController.postProductQuantityTable);
router.put("/", productQuantityTableController.putProductQuantityTable);
router.delete("/", productQuantityTableController.deleteProductQuantityTable);

module.exports = router;
