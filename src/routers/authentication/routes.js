const express = require('express');
const authenticationController = require('../../controllers/authentication/controller');

const router = express.Router();

router.post('/', authenticationController.postLogin);

module.exports = router;