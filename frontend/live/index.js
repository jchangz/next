// import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useTransition, a } from 'react-spring'
import { RouteContext } from '../context/routeContext'
import styles from './Live.module.css'

export default function Live() {
  const router = useRouter()
  const { stateRoute } = useContext(RouteContext)
  // const Kyoto = dynamic(() => import('./modules/kyoto.js'))
  // const Hakata = dynamic(() => import('./modules/hakata.js'))

  // const liveRoutes = {
  //   // "kyoto": Kyoto,
  //   // "hakata": Hakata
  // }

  // const Live = liveRoutes[router.query.slug]

  const transitions = useTransition(stateRoute.isLiveOpen && router.query.slug, null, {
    from: { transform: 'translate3d(0,100%,0) scale(1)' },
    enter: { transform: 'translate3d(0,0%,0) scale(1)' },
    leave: { transform: 'translate3d(0,100%,0) scale(1)' },
  })

  return (
    <>
      {transitions.map(({ item, key, props }) => item && (
        <a.div className={styles.live} style={props} key={key}>
          <div className={styles.mobileTest}>
            <div className={styles.mobileContainer}>
              {/* <Live /> */}
            </div>
          </div>
        </a.div>
      ))}
    </>
  )
}
