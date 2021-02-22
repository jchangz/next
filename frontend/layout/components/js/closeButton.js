import { useContext } from 'react'
import { useRouter } from 'next/router'
import { RouteContext } from '../../../context/routeContext'
import styles from '../Component.module.css'
import Link from 'next/link'

export default function CloseButton({ ...props }) {
    const router = useRouter()
    const { stateRoute, dispatchRoute } = useContext(RouteContext);

    const close = () => {
        if (stateRoute.isLiveOpen === false) {
            dispatchRoute({ type: 'setRouteClose' })
            props.setSelectedImage(null)
        }
        else {
            dispatchRoute({ type: 'setLiveClose' })
        }
    }

    return (
        <>
            {stateRoute.isRouteOpen && (stateRoute.isRouteImmediate === false || stateRoute.isLiveOpen === true) ?
                <Link href={stateRoute.isLiveOpen === false ? "/" : `/posts/${router.query.slug}`}>
                    <a onClick={close} className={styles.close} />
                </Link>
                : null}
        </>
    )
}