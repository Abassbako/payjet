const express = require('express');
const stripe = require('stripe') (process.env.STRIPE_SEC_KEY);

const router = express.Router();

router.post('/payment', (req, res) => {
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "NGN"
        }
    ), (stripeErr, stripeRes) => {
        if (stripeErr) return res.status(500).json(stripeErr);

        else return res.status(201).json(stripeRes);
    }
});

module.exports = router;