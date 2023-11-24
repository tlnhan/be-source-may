const express = require('express');
const listSizeController = require('../../../controllers/list/size/controller');

const router = express.Router();

router.get('/', listSizeController.getListSizeProducts);
router.post('/', listSizeController.postListSizeProduct);
router.put('/', listSizeController.putListSizeProduct);
router.delete('/', listSizeController.deleteListSizeProduct);

module.exports = router;