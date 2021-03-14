import { useContext } from 'react'
import { RouteContext } from '../../../context/routeContext'
import styles from '../Component.module.css'

export default function PlaceholderLoad() {
  const { stateRoute } = useContext(RouteContext)
  const { isRouteOpen, isPostLoaded } = stateRoute

  return (
    <>
      {isRouteOpen && !isPostLoaded ? (
        <div className={styles.loading}>
          <div className={styles.loadingTitle} />
          <div className={styles.loadingSubtitle} />
          <div className={styles.loadingSubtitle} />
        </div>
      ) : null}
    </>
  )
}
