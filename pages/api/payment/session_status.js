// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

//     res.status(200).json({
//       status: session.status,
//       customer_email: session.customer_details.email,
//     });
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// }

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





// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

//       if (!session.setup_intent) {
//         return res.status(400).json({ error: "No setup_intent found on this session" });
//       }

//       // Retrieve the SetupIntent
//       const setupIntent = await stripe.setupIntents.retrieve(session.setup_intent);

//       // Retrieve the saved payment method
//       const paymentMethodId = setupIntent.payment_method;
//       const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

//       // Log values for debugging
//       console.log("Session Status:", session.status);
//       console.log("Customer Email:", session.customer_details?.email);
//       console.log("Customer Name:", session.customer_details?.name);
//       console.log("SetupIntent Status:", setupIntent.status);
//       console.log("Payment Method ID:", paymentMethodId);
//       console.log("Payment Method Type:", paymentMethod.type);
//       console.log("Card Last4:", paymentMethod.card?.last4);

//       res.status(200).json({
//         status: session.status,
//         customer_email: session.customer_details?.email,
//         customer_name: session.customer_details?.name,
//         setup_intent_status: setupIntent.status,
//         payment_method_id: paymentMethodId,
//         payment_method_type: paymentMethod.type,
//         last4: paymentMethod.card?.last4, // if card
//       });
//     } catch (err) {
//       console.error("Error retrieving session/setupIntent:", err);
//       res.status(500).json({ error: err.message });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end('Method Not Allowed');
//   }
// }



// pages/api/payment/session_status.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({ error: 'Missing session_id query parameter' });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Log for debugging
    console.log('Checkout Session:', session);

    res.status(200).json({
      status: session.status, // 'open', 'complete', or 'expired'
      customer_email: session.customer_details?.email || null,
      customer_name: session.customer_details?.name || null,
      setup_intent: session.setup_intent || null,
      payment_intent: session.payment_intent || null,
    });
  } catch (err) {
    console.error('Error fetching session:', err);
    res.status(500).json({ error: err.message });
  }
}
