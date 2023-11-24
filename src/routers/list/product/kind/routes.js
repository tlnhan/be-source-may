const express = require('express');
const listKindProductController = require('../../../../controllers/list/product/kind/controller');

const router = express.Router();

router.get('/', listKindProductController.getListKindProducts);
router.post('/', listKindProductController.postListKindProduct);
router.put('/', listKindProductController.putListKindProduct);
router.delete('/', listKindProductController.deleteListKindProduct);

module.exports = router;