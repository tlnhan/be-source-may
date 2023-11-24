const express = require('express');
const listProductController = require('../../../controllers/list/product/controller');

const router = express.Router();

router.get('/', listProductController.getListProducts);
router.post('/', listProductController.postListProduct);
router.put('/', listProductController.putListProduct);
router.delete('/', listProductController.deleteListProduct);

module.exports = router;