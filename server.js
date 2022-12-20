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
    console.log(req.body)
    // console.log(req.params)
    const session = await stripe.checkout.sessions.create({
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto', 
        shipping_options: [
            { shipping_rate: 'shr_1MFNhCBIEZeIAiqxJCVy3g4L'},
            { shipping_rate: 'shr_1MFNhyBIEZeIAiqxyD6jPghu'}, 
        ],
    line_items: req.body.cartItems.map((itemVal) => { 
      const item = itemVal[0]
      const img = item.image[0].asset._ref
      const newImage = img.replace('image-', 'https://cdn.sanity.io/images/9cixj163/production/').replace('-webp', '.webp')


      const lineItem = { 
        price_data: { 
          currency: 'usd', 
          product_data: { 
            name: item.name,  
            images: [newImage]
          }, 
          unit_amount: item.price * 100,
        }, 
        adjustable_quantity: { 
          enabled: true, 
          minimum: 1,
        }, 
        quantity: itemVal.quantity
      }
      console.log(lineItem)
      return lineItem
    }),
    success_url: `http://localhost:3000/product/wired-earbuds`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.json({ stripeUrl: session.url });
});

app.listen(4242, () => console.log('Running on port 4242'));