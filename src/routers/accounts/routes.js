const express = require('express');
const accountsController = require('../../controllers/accounts/controller');

const router = express.Router();

router.post('/', accountsController.postAccount);

module.exports = router;