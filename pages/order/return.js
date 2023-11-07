import { Return } from '@/components/Checkout/EmbedCheckout'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

export default function ReturnPage() {

    return (
        <>
            <main className={styles.main}>
                <Return/>            
                    
                <Link href={'/'} >
                    Return to Home Page
                </Link>
            </main>
        </>
    )
}
