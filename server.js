const express = require('express');
const path = require('path');
const Stripe = require('stripe');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require('cors')

require('dotenv').config()
require('./config/database')

const stripe = Stripe(process.env.STRIPE_SECERT_TEST)
const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'build')))

app.use(require('./config/checkToken'))

app.use('/api/users', require('./routes/api/users'))

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const port = process.env.PORT || 3001

app.listen(port, function() {
    console.log(`Express app running on port ${port}`)
});

// this is for stripeeeee

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
    console.log(req.body.slug)
    console.log(req.params)
    const session = await stripe.checkout.sessions.create({
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto', 
        shipping_options: [
            { shipping_rate: 'shr_1MFNhCBIEZeIAiqxJCVy3g4L'},
            { shipping_rate: 'shr_1MFNhyBIEZeIAiqxyD6jPghu'}, 
        ],
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));