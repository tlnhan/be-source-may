const express = require('express');
const listTypeProductController = require('../../../../controllers/list/product/type/controller');

const router = express.Router();

router.get('/', listTypeProductController.getListTypeProducts);
router.post('/', listTypeProductController.postListTypeProduct);
router.put('/', listTypeProductController.putListTypeProduct);
router.delete('/', listTypeProductController.deleteListTypeProduct);

module.exports = router;