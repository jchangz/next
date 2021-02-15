import React, { useContext } from "react"
import { useRouter } from 'next/router'
import { RouteContext } from "../../../context/routeContext"
import styles from '../Component.module.css'

export default function CloseButton({ ...props }) {
    const router = useRouter()
    const { stateRoute, dispatchRoute } = useContext(RouteContext);

    const close = () => {
        router.push("/")
        dispatchRoute({ type: 'setRouteClose' })
        props.setSelectedImage(null)
    }

    return (
        <>
            {stateRoute.isRouteOpen && stateRoute.isRouteImmediate === false ?
                <button className={styles.close} onClick={close} />
                : null}
        </>
    )
}