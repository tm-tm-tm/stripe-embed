import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Success = () => {
  const router = useRouter();
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    // Retrieve the session_id from the query parameters
    const { session_id } = router.query;

    if (session_id) {
      // Make an API request to retrieve customer data using session_id
      fetch(`/api/order/success?session_id=${session_id}`)
        .then((response) => response.json())
        .then((data) => {
            
          setCustomerName(data.customer.name);
          console.log(customerName)
        })
        .catch((error) => {
          console.error('Error fetching customer data:', error);
          // Handle the error as needed
        });
    }
  }, [router.query]);

  return (
    <div>
      <h1>Thanks for your order, {customerName}!</h1>
      {/* Add any other content or styling you need for the success page */}
    </div>
  );
};

export default Success;




// app.get('/order/success', async (req, res) => {
//   const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
//   const customer = await stripe.customers.retrieve(session.customer);

//   res.send(`<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`);
// });

// app.listen(4242, () => console.log(`Listening on port ${4242}!`));



// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//       try {
//         // Create Checkout Sessions from body params.
//         const session = await stripe.checkout.sessions.create({
//           line_items: [
//             {
//               // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//               price: 'price_1Nz8hqKyTx6KPkBzyGIXHfnv',
//               quantity: 1,
//             },
//           ],
//           mode: 'payment',
//           // success_url: `${req.headers.origin}/?success=true`, 
//           success_url: `${req.headers.origin}/order/success?session_id={CHECKOUT_SESSION_ID}`, 
//           cancel_url: `${req.headers.origin}/?canceled=true`,
//         });
//         res.redirect(303, session.url);
//       } catch (err) {
//         res.status(err.statusCode || 500).json(err.message);
//       }
//     } else {
//       res.setHeader('Allow', 'POST');
//       res.status(405).end('Method Not Allowed');
//     }
//   }
  


//   const subscribe = async (e) => {
//     e.preventDefault();
//     setFormStatus('processing...')

//     const res = await fetch('/api/subscribe', {
//       body: JSON.stringify({
//         email: inputElement.current.value
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       method: 'POST'
//     })

//     const { error } = await res.json()
//     if (error) {
//       setFormStatus('error')
//       setMessage('Please try again.')
//       inputElement.current.value = ''
//       return
//     }

//     inputElement.current.value = ''
//     setMessage('You are now subscribed.')
//     setFormStatus('subscribed')
//   }


//   import mailchimp from '@mailchimp/mailchimp_marketing'

// mailchimp.setConfig({
//   apiKey: process.env.MAILCHIMP_API_KEY,
//   server: process.env.MAILCHIMP_API_SERVER
// })

// export default async (req, res) => {
//   const { email } = req.body

//   if (!email) {
//     return res.status(400).json({ error: 'Email is required' })
//   }

//   try {
//     await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
//       email_address: email,
//       status: 'subscribed'
//     });

//     return res.status(201).json({ error: '' })
//   } catch (error) {
//     return res.status(500).json({ error: error.message || error.toString() })
//   }
// }

