import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

export default function Return() {
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('')
    const router = useRouter()

    useEffect(() => {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const sessionId = urlParams.get('session_id')

        if (!sessionId) return

        fetch(`/api/payment/session_status?session_id=${sessionId}`)
            .then(res => res.json())
            .then(data => {
                setStatus(data.status)
                setCustomerEmail(data.customer_email)

                // Client-side redirect if status is open
                if (data.status === 'open') {
                    router.push('/')
                }
            })
            .catch(err => console.error(err))
    }, [router])

    if (!status || status === 'open') {
        return <p>Loading...</p>
    }

    if (status === 'complete') {
        return (
            <main className={styles.main}>
                <section id="success">
                    <p>
                        We appreciate your business! A confirmation email will be sent to {customerEmail}.
                        <br />
                        If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
                    </p>
                </section>

                <Link href="/">Return to Home Page</Link>
            </main>
        )
    }

    return null
}
