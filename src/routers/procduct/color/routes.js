const express = require('express');
const productColorController = require('../../../controllers/product/color/controller');

const router = express.Router();

router.get('/', productColorController.getProductColors);
router.post('/', productColorController.postProductColor);
router.put('/', productColorController.putProductColor);
router.delete('/', productColorController.deleteProductColor);

module.exports = router;