var Order = require("../models/order.model");

module.exports.createAnOrder = async function (req, res) {
  await Order.create(req.body);
  return res.json(req.body)
}