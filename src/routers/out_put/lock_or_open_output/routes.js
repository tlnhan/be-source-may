const express = require('express');
const lockOrOpenOutputController = require('../../../controllers/out_put/lock_or_open_output/controller');

const router = express.Router();

router.post('/lock', lockOrOpenOutputController.postLockOutput);
router.post('/open', lockOrOpenOutputController.postOpenOutput);

module.exports = router;