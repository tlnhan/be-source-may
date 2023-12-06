const express = require("express");
const accountsController = require("../../controllers/accounts/controller");

const router = express.Router();

router.post("/get", accountsController.getAccount);
router.post("/post", accountsController.postAccount);
router.post("/detail", accountsController.detailAccount);
router.put("/changepass", accountsController.changePass);

module.exports = router;
