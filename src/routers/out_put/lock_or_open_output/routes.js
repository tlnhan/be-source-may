const express = require('express');
const lockOrOpenOutputController = require('../../../controllers/out_put/lock_or_open_output/controller');

const router = express.Router();

router.post('/lockdate', lockOrOpenOutputController.postLockOutput);
router.post('/lockperson', lockOrOpenOutputController.postLockPersonOutput);
router.post('/opendate', lockOrOpenOutputController.postOpenOutput);
router.post('/openperson', lockOrOpenOutputController.postOpenPersonOutput);

module.exports = router;