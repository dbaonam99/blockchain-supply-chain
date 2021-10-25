const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
  symbol: String,
  status: String,
  clientOrderId: String,
  price: String,
  avgPrice: String,
  origQty: String,
  executedQty: String,
  cumQty: String,
  cumQuote: String,
  timeInForce: String,
  type: String,
  reduceOnly: Boolean,
  closePosition: Boolean,
  side: String,
  positionSide: String,
  stopPrice: String,
  workingType: String,
  priceProtect: Boolean,
  origType: String,
  updateTime: Number
	},
    {
    	versionKey: false
    }
)

var Order = mongoose.model('Order', orderSchema, 'order');

module.exports = Order;