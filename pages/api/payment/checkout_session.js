const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const session = await stripe.checkout.sessions.create({
                mode: 'payment',
                ui_mode: 'embedded',
                // billing_address_collection: 'auto',
                shipping_address_collection: {
                    allowed_countries: ['AU', 'US', 'CA', 'GB'],
                },
                line_items: [
                    {
                        price: 'price_1Nz86pKyTx6KPkBzSnzLxIyn',
                        quantity: 1,
                    },
                ],
                return_url: `${req.headers.origin}/order/return?session_id={CHECKOUT_SESSION_ID}`,
                invoice_creation: {
                    enabled: true,
                }
            });

            res.send({ clientSecret: session.client_secret });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method Not Allowed');
    }
}
