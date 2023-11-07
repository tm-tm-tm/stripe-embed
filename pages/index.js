import EmbedCheckout from '@/components/Checkout/EmbedCheckout'
import SideDrawer from '@/components/SideDrawer/SideDrawer'
import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <SideDrawer>
          <EmbedCheckout/>
        </SideDrawer>
      </main>
    </>
  )
}
