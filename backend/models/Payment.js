const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  customerId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  currency: String,
  provider: String,
  payeeAccount: String,
  swiftCode: String,
  verified: { type: Boolean, default: false },
  submittedToSwift: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
