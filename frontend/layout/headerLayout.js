import { useContext } from 'react'
import Link from 'next/link'
import { RouteContext } from '../context/routeContext'
import styles from './components/Component.module.css'

export default function HeaderLayout() {
    const { stateRoute, dispatchRoute } = useContext(RouteContext);

    const reset = () => {
        dispatchRoute({ type: 'setRouteClose' })
    }

    return (
        <>
            {stateRoute.isLiveOpen ? null :
                <div className={styles.header}
                    style={stateRoute.isRouteImmediate ? { zIndex: "3" } : null}>
                    <Link href="/" >
                        <a className={styles.logo}
                            onClick={reset}>
                            Frontin<span className={styles.blue}>dev</span></a>
                    </Link>
                </div>
            }
        </>
    )
}