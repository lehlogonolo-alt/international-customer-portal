const express = require('express');
const router = express.Router();
const { submitPayment, getPayments, verifyPayment, submitToSwift } = require('../controllers/paymentController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, submitPayment);
router.get('/', auth, getPayments);
router.put('/verify/:id', auth, verifyPayment);
router.put('/submit/:id', auth, submitToSwift);

module.exports = router;
