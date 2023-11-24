const express = require('express');
const lockOrOpenOutputController = require('../../../controllers/out_put/lock_or_open_output/controller');

const router = express.Router();

router.post('/', lockOrOpenOutputController.postLockOrOpenOutput);

module.exports = router;