const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    res.status(200).json({
      status: session.status,
      customer_email: session.customer_details.email,
    });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

//     res.send({
//       status: session.status,
//       customer_name: session.customer_details.name,
//       customer_email: session.customer_details.email    });
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// } 