const express = require("express");
const router = express.Router();

var controller = require("../controllers/order.controller");

router.post("/", controller.createAnOrder);

module.exports = router;