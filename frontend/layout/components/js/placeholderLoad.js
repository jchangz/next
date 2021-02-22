import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { RouteContext } from '../../../context/routeContext'
import styles from '../Component.module.css'

export default function PlaceholderLoad() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const { stateRoute } = useContext(RouteContext);

    useEffect(() => {
        router.events.on('routeChangeStart', () => setLoading(true))
        router.events.on('routeChangeComplete', () => setLoading(false))
        return () => {
            router.events.on('routeChangeStart', () => setLoading(true))
            router.events.on('routeChangeComplete', () => setLoading(false))
        }
    }, [])

    return (
        <>
            {loading && stateRoute.isRouteOpen ?
                <div className={styles.loading}>
                    <div className={styles.loadingTitle}></div>
                    <div className={styles.loadingSubtitle}></div>
                    <div className={styles.loadingSubtitle}></div>
                </div>
                : null
            }
        </>
    )
}