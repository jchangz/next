// import dynamic from 'next/dynamic'
import styles from './Live.module.css'

export default function Live() {
  // const Kyoto = dynamic(() => import('./modules/kyoto.js'))
  // const Hakata = dynamic(() => import('./modules/hakata.js'))

  // const liveRoutes = {
  //   // "kyoto": Kyoto,
  //   // "hakata": Hakata
  // }

  // const Live = liveRoutes[router.query.slug]

  return (
    <>
      <div className={styles.live}>
        <div className={styles.mobileTest}>
          <div className={styles.mobileContainer}>
            <div style={{ position: 'absolute' }}>
              {/* <Live /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
