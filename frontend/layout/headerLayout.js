import { useContext } from 'react'
import Link from 'next/link'
import { RouteContext } from '../context/routeContext'
import styles from './components/Component.module.css'

export default function HeaderLayout() {
  const { stateRoute } = useContext(RouteContext)

  return (
    <>
      {stateRoute.isLiveOpen || stateRoute.isRouteOpen ? null : (
        <div
          className={styles.header}
          style={stateRoute.isRouteImmediate ? { zIndex: '3' } : null}
        >
          <div>
            <Link href="/">
              <a className={styles.logo}>
                Frontin
                <span className={styles.blue}>dev</span>
              </a>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
