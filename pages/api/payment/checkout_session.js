const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // const { email, name } = req.body; // sent from frontend

            // // 1️⃣ Create customer
            // const customer = await stripe.customers.create({
            //     email,
            //     name,
            // });

            // Payment Intent/Future Payment
            // const session = await stripe.checkout.sessions.create({
            //     mode: 'setup',         // ← change from 'payment' to 'setup'
            //     payment_method_types: ['card'],  // optional, but recommended
            //     ui_mode: 'embedded',
            //     shipping_address_collection: {
            //         allowed_countries: ['AU', 'US', 'CA', 'GB'],
            //     },
            //     return_url: `${req.headers.origin}/order/return?session_id={CHECKOUT_SESSION_ID}`,
            // });

            // Payment
            const session = await stripe.checkout.sessions.create({
                mode: 'payment',
                ui_mode: 'embedded',
                submit_type: 'pay',
                payment_method_types: ['card', 'link'],
                line_items: [
                    {
                        price: 'price_1S0cRiKyTx6KPkBz2oUgNrEw',
                        quantity: 1,
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                            maximum: 10,
                        },
                    },
                ],
                automatic_tax: { enabled: true },
                billing_address_collection: 'required',
                phone_number_collection: { enabled: true },
                shipping_address_collection: {
                    allowed_countries: ['AU'],
                },
                payment_intent_data: {
                    capture_method: 'manual',
                },
                customer_creation: 'always',
                // consent_collection: {
                //     terms_of_service: 'required',
                //     promotions: 'auto',
                // },
                return_url: `${req.headers.origin}/order/return?session_id={CHECKOUT_SESSION_ID}`,
            });

            // Subscription
            // const session = await stripe.checkout.sessions.create({
            //     mode: 'subscription',
            //     payment_method_types: ['card', "link"],
            //     line_items: [
            //         {
            //             price: 'price_1S0b60KyTx6KPkBzobgTpVBR',
            //             quantity: 1, // default starting quantity
            //             adjustable_quantity: {
            //                 enabled: true,       // allow adjustment
            //                 minimum: 1,          // min quantity user can select
            //                 maximum: 10,         // max quantity user can select
            //             },
            //         },
            //     ],
            //     ui_mode: 'embedded',
            //     return_url: `${req.headers.origin}/order/return?session_id={CHECKOUT_SESSION_ID}`,
            // });

            // If using 'setup' mode, retrieve the SetupIntent
            // let setupIntent = null;
            // if (session.setup_intent) {
            //     setupIntent = await stripe.setupIntents.retrieve(session.setup_intent);
            // }

            // // Console log for debugging
            // console.log("=== Stripe Checkout Session ===");
            // console.log(session);
            // console.log("=== SetupIntent ===");
            // console.log(setupIntent);

            res.status(200).json({
                clientSecret: session.client_secret,
                sessionId: session.id,
                // setup_intent: setupIntent,
            });
        } catch (error) {
            console.error("Error creating session or retrieving setup intent:", error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method Not Allowed');
    }
}
