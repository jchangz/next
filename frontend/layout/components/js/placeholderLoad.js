import { useContext } from 'react'
import { RouteContext } from '../../../context/routeContext'
import styles from '../Component.module.css'

export default function PlaceholderLoad({ routeLoaded }) {
  const { stateRoute } = useContext(RouteContext)

  return (
    <>
      {!routeLoaded && stateRoute.isRouteOpen ? (
        <div className={styles.loading}>
          <div className={styles.loadingTitle} />
          <div className={styles.loadingSubtitle} />
          <div className={styles.loadingSubtitle} />
        </div>
      ) : null}
    </>
  )
}
