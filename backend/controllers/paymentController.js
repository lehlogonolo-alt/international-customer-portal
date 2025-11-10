const Payment = require('../models/Payment');

exports.submitPayment = async (req, res) => {
  const { amount, currency, provider, payeeAccount, swiftCode } = req.body;
  try {
    const payment = new Payment({
      customerId: req.user.userId,
      amount,
      currency,
      provider,
      payeeAccount,
      swiftCode
    });
    await payment.save();
    res.status(201).json({ message: 'Payment submitted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit payment', error: err.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ customerId: req.user.userId });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch payments', error: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await Payment.findById(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    payment.verified = true;
    await payment.save();
    res.json({ message: 'Payment verified' });
  } catch (err) {
    res.status(500).json({ message: 'Verification failed', error: err.message });
  }
};

exports.submitToSwift = async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await Payment.findById(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    payment.submittedToSwift = true;
    await payment.save();
    res.json({ message: 'Submitted to SWIFT' });
  } catch (err) {
    res.status(500).json({ message: 'SWIFT submission failed', error: err.message });
  }
};

