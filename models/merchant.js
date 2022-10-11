var mongoose = require('mongoose');

var MerchantSchema = new mongoose.Schema({
  corporate_customer_name: String,
  mcc: String,
  van: Number,
  webhook_url: String,
  payments: [
    {
      amount: String,
      customer_name: String,
      payment_mode: String
    }
  ]
});

module.exports = mongoose.model('merchant_list', MerchantSchema);