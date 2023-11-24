const express = require('express');
const listKindController = require('../../../controllers/list/kind/controller');

const router = express.Router();

router.get('/', listKindController.getListKinds);
router.post('/', listKindController.postListKind);
router.put('/', listKindController.putListKind);
router.delete('/', listKindController.deleteListKind);

module.exports = router;