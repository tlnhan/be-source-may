const express = require('express');
const listUnitController = require('../../../controllers/list/unit/controller');

const router = express.Router();

router.get('/', listUnitController.getListUnitProducts);
router.post('/', listUnitController.postListUnitProduct);
router.put('/', listUnitController.putListUnitProduct);
router.delete('/', listUnitController.deleteListUnitProduct);

module.exports = router;