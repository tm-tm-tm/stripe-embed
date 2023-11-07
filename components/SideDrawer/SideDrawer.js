import { useState } from 'react'
import styles from './SideDrawer.module.css'

const SideDrawer = ({ children }) => {
    const [toggleDrawer, setToggleDrawer] = useState(false)

    return (
        <>
            <button
                onClick={() => setToggleDrawer(!toggleDrawer)}
                className={styles.button}
            >
                OPEN
            </button>
            <div
                className={toggleDrawer === false ? `${styles.containerClose} ${styles.container}` : `${styles.container}`}
            >
                <div className={styles.drawer}>
                    {children}
                </div>

                <button
                    className={styles.closeButton}
                    onClick={() => setToggleDrawer(!toggleDrawer)}
                >
                    CLOSE
                </button>
            </div>
        </>

    )
}

export default SideDrawer


