import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

export default function Return() {
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('')

    useEffect(() => {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const sessionId = urlParams.get('session_id')

        fetch(`/api/payment/session_status?session_id=${sessionId}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                setStatus(data.status)
                setCustomerEmail(data.customer_email)
            })
    }, [])

    if (status === 'open') {
        return (
            redirect('/')
        )
    }

    if (status === 'complete') {
        return (
            <>
                <main className={styles.main}>
                    <section id="success">
                        <p>
                            We appreciate your business! A confirmation email will be sent to {customerEmail}.

                            If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
                        </p>
                    </section>

                    <Link
                        ref={'/'}
                    >
                        Return to Home Page
                    </Link>
                </main>
            </>

        )
    }

    return null
}