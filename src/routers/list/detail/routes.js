const express = require('express');
const listDetailController = require('../../../controllers/list/detail/controller');

const router = express.Router();

router.get('/', listDetailController.getListDetails);
router.post('/', listDetailController.postListDetail);
router.put('/', listDetailController.putListDetail);
router.delete('/', listDetailController.deleteListDetail);

module.exports = router;