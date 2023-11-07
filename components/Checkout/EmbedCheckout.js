import { useState, useEffect } from "react"
import { loadStripe } from '@stripe/stripe-js'
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js'
import { useRouter } from "next/router"
import styles from '@/styles/Home.module.css'

const stripePromise = loadStripe("pk_test_51JQ5G2KyTx6KPkBzFA64bn35rATswS3nQLp83iRO6NJvtnh094himWiqku0D2XL2Cy8tBRRUMn4TlrgZl2T45Fpa00Hp7Rr9m3")
// import stripePromise from '@/lib/stripe'

const EmbedCheckout = () => {
    const [clientSecret, setClientSecret] = useState('')

    useEffect(() => {
        // Create a Checkout Session as soon as the page loads
        fetch("/api/payment/create-checkout-session", {
            method: "POST",
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))
    }, []);

    return (
        <div id="checkout">
            {clientSecret && (
                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={{ clientSecret }}
                >
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            )}
        </div>
    )
}

const Return = () => {
    const [status, setStatus] = useState(null)
    const [customerEmail, setCustomerEmail] = useState('')
    const [customerName, setCustomerName] = useState('')
    const router = useRouter()

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        const sessionId = urlParams.get('session_id')

        fetch(`/api/payment/session-status?session_id=${sessionId}`)
            .then((res) => res.json())
            .then((data) => {
                setStatus(data.status)
                setCustomerEmail(data.customer_email)
                setCustomerName(data.customer_name)
            });
    }, []);

    if (status === 'open') {
        router.push('/embed')
    }

    if (status === 'complete') {
        return (
            <section id="success">
                <p>
                    Thank you {customerName}

                    We appreciate your business! A confirmation email will be sent to {customerEmail}.

                    If you have any questions, please email
                    <a href="mailto:orders@example.com">orders@example.com</a>.
                </p>
            </section>
        )
    }

    return null
}

export { EmbedCheckout, Return }

