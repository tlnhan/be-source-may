const express = require('express');
const listColorController = require('../../../controllers/list/color/controller');

const router = express.Router();

router.get('/', listColorController.getListColors);
router.post('/', listColorController.postListColor);
router.put('/', listColorController.putListColor);
router.delete('/', listColorController.deleteListColor);

module.exports = router;