const express = require('express');
const router = express.Router();

const controller = require('../controllers/user.controller');
const middleware = require('../middleWares/token.middleWare');

router.get('/', middleware.verifyToken, controller.index);
router.get('/get-by-address/:address', controller.getByAddress);
router.post('/get-all', controller.getAll);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/refresh-token', controller.refresh);

module.exports = router;
